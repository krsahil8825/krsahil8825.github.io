import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "node:stream";
import { SITE_META } from "../src/config/site-config.ts";

const ROOT = process.cwd();
const SITE_URL: string = SITE_META.url;

const PATHS = {
    output: path.join(ROOT, "public", "image-sitemap.xml"),
    blogsContent: path.join(ROOT, "src", "content", "blogs"),
    projectsContent: path.join(ROOT, "src", "content", "projects"),
};

function extractImagePathFromMarkdown(markdown: string): string | null {
    const match = markdown.match(/^imagePath:\s*["']?([^"'\n]+)["']?\s*$/m);
    return match?.[1]?.trim() || null;
}

function normalizeImageUrl(value: string | null): string | null {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    if (value.startsWith("data:")) return null;
    if (path.extname(value).toLowerCase() === ".svg") return null;
    return value.startsWith("/") ? value : `/${value}`;
}

function extractContentImages(
    contentDir: string,
    baseRoute: string
): { url: string; img: { url: string }[] }[] {
    if (!fs.existsSync(contentDir)) return [];

    return fs
        .readdirSync(contentDir)
        .filter((f: string) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map((file: string) => {
            const slug = file.replace(/\.(md|mdx)$/, "");
            const filePath = path.join(contentDir, file);

            const markdown = fs.readFileSync(filePath, "utf-8");

            const image = normalizeImageUrl(
                extractImagePathFromMarkdown(markdown)
            );
            if (!image) return null;

            return {
                url: `/${baseRoute}/${slug}`,
                img: [{ url: image }],
            };
        })
        .filter((entry): entry is { url: string; img: { url: string }[] } => Boolean(entry));
}

async function getStaticImages(): Promise<{ url: string; img: { url: string }[] }[]> {
    const files = await globby([
        "public/**/*.{png,jpg,jpeg,webp,avif,gif}",
        "!public/**/*.svg",
    ]);

    return files.map((file: string) => ({
        url: "/",
        img: [
            {
                url: "/" + path.relative("public", file).replace(/\\/g, "/"),
            },
        ],
    }));
}

function deduplicate(
    entries: { url: string; img: { url: string }[] }[]
): { url: string; img: { url: string }[] }[] {
    const map = new Map<string, Set<string>>();

    for (const entry of entries) {
        if (!map.has(entry.url)) {
            map.set(entry.url, new Set());
        }

        entry.img.forEach((img) => {
            map.get(entry.url)!.add(img.url);
        });
    }

    return Array.from(map.entries()).map(([url, images]) => ({
        url,
        img: Array.from(images)
            .sort((a, b) => a.localeCompare(b))
            .map((url) => ({ url })),
    }));
}

async function generateImageSitemap(): Promise<void> {
    new URL(SITE_URL);

    const staticImages = await getStaticImages();

    const contentImages = [
        ...extractContentImages(PATHS.blogsContent, "blogs"),
        ...extractContentImages(PATHS.projectsContent, "projects"),
    ];

    const merged = deduplicate([...staticImages, ...contentImages]).sort(
        (a, b) => a.url.localeCompare(b.url)
    );

    const stream = new SitemapStream({
        hostname: SITE_URL,
        xmlns: {
            image: true,
            video: false,
            news: false,
            xhtml: false,
        },
    });

    const xml = await streamToPromise(Readable.from(merged).pipe(stream));
    await fs.promises.writeFile(PATHS.output, xml);

    console.log(`Generated image sitemap with ${merged.length} pages`);
}

generateImageSitemap().catch((error: unknown) => {
    console.error("Failed to generate image sitemap");
    console.error(error);
    process.exitCode = 1;
});
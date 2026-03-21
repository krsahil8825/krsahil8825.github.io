import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { SITE_META } from "./../src/config/site-config.ts";

const ROOT = process.cwd();
// const SITE_URL = "https://krsahil.co.in";
const SITE_URL = SITE_META.url;

const PATHS = {
    output: path.join(ROOT, "public", "image-sitemap.xml"),
    blogsContent: path.join(ROOT, "src", "content", "blogs"),
    projectsContent: path.join(ROOT, "src", "content", "projects"),
};

function extractImagePathFromMarkdown(markdown) {
    const match = markdown.match(/^imagePath:\s*["']?([^"'\n]+)["']?\s*$/m);
    return match?.[1]?.trim() || null;
}

function extractContentImages(contentDir, baseRoute) {
    if (!fs.existsSync(contentDir)) return [];

    return fs
        .readdirSync(contentDir)
        .filter((f) => f.endsWith(".md"))
        .map((file) => {
            const slug = file.replace(".md", "");
            const filePath = path.join(contentDir, file);

            const markdown = fs.readFileSync(filePath, "utf-8");

            const image = extractImagePathFromMarkdown(markdown);
            if (!image) return null;

            if (path.extname(image).toLowerCase() === ".svg") return null;

            return {
                url: `/${baseRoute}/${slug}`,
                img: [{ url: image.startsWith("/") ? image : `/${image}` }],
            };
        })
        .filter(Boolean);
}

async function getPages() {
    const files = await globby(["src/pages/**/*.{astro,md,mdx}", "!src/pages/**/[[]*[]]*.*"]);

    return files.map((file) => {
        let route = file
            .replace("src/pages", "")
            .replace(/\.(astro|md|mdx)$/, "")
            .replace(/\/index$/, "");

        if (route === "") route = "/";

        return { url: route };
    });
}

async function getStaticImages() {
    const files = await globby(["public/**/*.{png,jpg,jpeg,webp,avif,gif}", "!public/**/*.svg"]);

    return files.map((file) => ({
        url: "/",
        img: [
            {
                url: "/" + path.relative("public", file).replace(/\\/g, "/"),
            },
        ],
    }));
}

function deduplicate(entries) {
    const map = new Map();

    for (const entry of entries) {
        if (!map.has(entry.url)) {
            map.set(entry.url, new Set());
        }

        entry.img.forEach((img) => {
            map.get(entry.url).add(img.url);
        });
    }

    return Array.from(map.entries()).map(([url, images]) => ({
        url,
        img: Array.from(images).map((url) => ({ url })),
    }));
}

async function generateImageSitemap() {
    const staticImages = await getStaticImages();

    const contentImages = [
        ...extractContentImages(PATHS.blogsContent, "blogs"),
        ...extractContentImages(PATHS.projectsContent, "projects"),
    ];

    const merged = deduplicate([...staticImages, ...contentImages]);

    const stream = new SitemapStream({
        hostname: SITE_URL,
        xmlns: { image: true },
    });

    const writeStream = createWriteStream(PATHS.output);

    Readable.from(merged).pipe(stream).pipe(writeStream);

    await streamToPromise(stream);

    console.log(`Generated image sitemap with ${merged.length} pages`);
}

generateImageSitemap();

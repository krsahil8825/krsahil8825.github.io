import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";

const ROOT = process.cwd();
const SITE_URL = "https://krsahil.co.in";

const PATHS = {
    output: path.join(ROOT, "public", "image-sitemap.xml"),
    blogsContent: path.join(ROOT, "src", "content", "blogs"),
    projectsContent: path.join(ROOT, "src", "content", "projects"),
};

// Only raster images (NO SVG)
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

// Extract imagePath from Markdown frontmatter

function extractImagePathFromMarkdown(markdownContent) {
    const imagePathMatch = markdownContent.match(/^imagePath:\s*["']?([^"'\n]+)["']?\s*$/m);
    return imagePathMatch?.[1]?.trim() || null;
}

function extractContentImages(contentDir, baseRoute) {
    if (!fs.existsSync(contentDir)) return [];

    return fs
        .readdirSync(contentDir)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const filePath = path.join(contentDir, fileName);
            const slug = fileName.replace(/\.md$/, "");
            const markdown = fs.readFileSync(filePath, "utf-8");

            const imagePath = extractImagePathFromMarkdown(markdown);
            if (!imagePath) return null;

            if (path.extname(imagePath).toLowerCase() === ".svg") return null;

            return {
                url: `/${baseRoute}/${slug}`,
                img: [
                    {
                        url: imagePath.startsWith("/") ? imagePath : `/${imagePath}`,
                    },
                ],
            };
        })
        .filter(Boolean);
}

// Get ALL static raster images from public/

async function getStaticImages() {
    const files = await globby(["public/**/*.{png,jpg,jpeg,webp,avif,gif}", "!public/**/*.svg"]);

    return files.map((file) => {
        const urlPath = "/" + path.relative(path.join(ROOT, "public"), file).replace(/\\/g, "/");

        return {
            url: "/", // associate static images with homepage
            img: [{ url: urlPath }],
        };
    });
}

// Merge + Remove Duplicates

function deduplicateEntries(entries) {
    const map = new Map();

    for (const entry of entries) {
        if (!map.has(entry.url)) {
            map.set(entry.url, new Set());
        }

        entry.img.forEach((image) => {
            map.get(entry.url).add(image.url);
        });
    }

    return Array.from(map.entries()).map(([url, images]) => ({
        url,
        img: Array.from(images).map((url) => ({ url })),
    }));
}

// Generate Image Sitemap

async function generateImageSitemap() {
    const staticImages = await getStaticImages();

    const contentImages = [
        ...extractContentImages(PATHS.blogsContent, "blogs"),
        ...extractContentImages(PATHS.projectsContent, "projects"),
    ];

    const merged = deduplicateEntries([...staticImages, ...contentImages]);

    const stream = new SitemapStream({
        hostname: SITE_URL,
        xmlns: {
            image: true,
        },
    });

    const writeStream = createWriteStream(PATHS.output);

    Readable.from(merged).pipe(stream).pipe(writeStream);

    await streamToPromise(stream);

    console.log(`Generated image sitemap with ${merged.length} URL entries`);
}

generateImageSitemap();

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://krsahil.co.in";

const PATHS = {
    output: path.join(ROOT, "public", "image-sitemap.xml"),
    blogsContent: path.join(ROOT, "src", "content", "blogs"),
    projectsContent: path.join(ROOT, "src", "content", "projects"),
    siteAssets: path.join(ROOT, "public", "site"),
    educationAssets: path.join(ROOT, "public", "education"),
};

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);

function listImagesInDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) return [];

    return fs
        .readdirSync(directoryPath)
        .map((name) => path.join(directoryPath, name))
        .filter((fullPath) => fs.statSync(fullPath).isFile())
        .filter((fullPath) => IMAGE_EXTENSIONS.has(path.extname(fullPath).toLowerCase()))
        .map((fullPath) => `/${path.relative(path.join(ROOT, "public"), fullPath).replace(/\\/g, "/")}`);
}

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

            return {
                loc: `${SITE_URL}/${baseRoute}/${slug}`,
                images: [imagePath.startsWith("/") ? imagePath : `/${imagePath}`],
            };
        })
        .filter(Boolean);
}

function unique(values) {
    return [...new Set(values)];
}

function buildImageSitemapXml(entries) {
    const xmlEntries = entries
        .map((entry) => {
            const imageTags = entry.images
                .map((imagePath) => `    <image:image><image:loc>${SITE_URL}${imagePath}</image:loc></image:image>`)
                .join("\n");

            return `  <url>\n    <loc>${entry.loc}</loc>\n${imageTags}\n  </url>`;
        })
        .join("\n\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${xmlEntries}\n</urlset>\n`;
}

const homeImages = unique([...listImagesInDirectory(PATHS.siteAssets), ...listImagesInDirectory(PATHS.educationAssets)]);

const entries = [
    {
        loc: `${SITE_URL}/`,
        images: homeImages,
    },
    ...extractContentImages(PATHS.blogsContent, "blogs"),
    ...extractContentImages(PATHS.projectsContent, "projects"),
];

const filteredEntries = entries.filter((entry) => entry.images.length > 0);
const xml = buildImageSitemapXml(filteredEntries);

fs.writeFileSync(PATHS.output, xml, "utf-8");
console.log(`Generated image sitemap with ${filteredEntries.length} URL entries at public/image-sitemap.xml`);

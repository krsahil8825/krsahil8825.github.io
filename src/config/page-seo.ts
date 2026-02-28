import type { CollectionEntry } from "astro:content";
import { createArticleSEO, createListingSEO } from "./seo";

export function getBlogsListingSEO(page: number) {
    return createListingSEO({
        title: `Blogs - Page ${page}`,
        description: "Explore My Blogs - Insights and updates on various topics.",
        path: `blogs/page/${page}`,
        keywords: ["blogs", "articles", "insights", "updates"],
        imagePath: "/site/blogs-hero.png",
    });
}

export function getProjectsListingSEO(page: number) {
    return createListingSEO({
        title: `Projects - Page ${page}`,
        description: "Explore My Projects - A showcase of backend, system design, and production-quality work.",
        path: `projects/page/${page}`,
        keywords: ["projects", "portfolio", "backend projects", "web development"],
        imagePath: "/site/projects-hero.png",
    });
}

export function getBlogArticleSEO(blog: CollectionEntry<"blogs">) {
    return createArticleSEO({
        title: blog.data.title,
        description: blog.data.description,
        path: "blogs",
        keywords: blog.data.keywords,
        imagePath: blog.data.imagePath,
        tags: blog.data.tags,
        slug: blog.slug,
        publishedTime: blog.data.publishedTime,
        modifiedTime: blog.data.modifiedTime,
    });
}

export function getProjectArticleSEO(project: CollectionEntry<"projects">) {
    return createArticleSEO({
        title: project.data.title,
        description: project.data.description,
        path: "projects",
        keywords: project.data.keywords,
        imagePath: project.data.imagePath,
        tags: project.data.tags,
        slug: project.slug,
        publishedTime: project.data.publishedTime,
        modifiedTime: project.data.modifiedTime,
    });
}

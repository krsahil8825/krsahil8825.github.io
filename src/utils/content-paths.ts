import { getCollection } from "astro:content";
import { buildPaginatedPaths, buildSlugPaths } from "./content-utils";

export async function getBlogsListingStaticPaths() {
    const blogs = await getCollection("blogs");
    return buildPaginatedPaths(blogs);
}

export async function getProjectsListingStaticPaths() {
    const projects = await getCollection("projects");
    return buildPaginatedPaths(projects);
}

export async function getBlogSlugStaticPaths() {
    const blogs = await getCollection("blogs");
    return buildSlugPaths(blogs, "blog");
}

export async function getProjectSlugStaticPaths() {
    const projects = await getCollection("projects");
    return buildSlugPaths(projects, "project");
}

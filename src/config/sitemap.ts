import { SITE } from "./site";

const IMAGE_PATHS = [
    "/site/profile.webp",
    "/site/favicon.png",
    "/site/favicon.svg",
    "/site/favicon-192x192.png",
    "/site/favicon-180x180.png",
    "/site/favicon-32x32.png",
    "/site/favicon-16x16.png",
    "/education/amity-university-patna-logo.png",
    "/education/bihar-school-examination-board-logo.png",
    "/education/central-board-of-secondary-education-logo.png",
    "/education/freecodecamp-logo.png",
    "/education/harvard-university-logo.png",
    "/education/iit-kharagpur-logo.png",
    "/posts/blogs/network-social-media-platform.jpg",
    "/posts/blogs/portfolio-website.png",
    "/posts/blogs/url-content-type-detector.jpg",
    "/posts/projects/network-social-media-platform.jpg",
    "/posts/projects/portfolio-website.png",
    "/posts/projects/url-content-type-detector.jpg",
];

const CORE_PATHS = ["/", "/blogs", "/projects", "/blogs/page/1", "/projects/page/1"];

export const SITEMAP_CUSTOM_PAGES = [...CORE_PATHS, ...IMAGE_PATHS].map((path) => `${SITE.url}${path}`);

export function shouldIncludeInSitemap(page: string): boolean {
    return !page.includes("/404");
}

// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import { SITE } from "./src/config/site";
import { SITEMAP_CUSTOM_PAGES, shouldIncludeInSitemap } from "./src/config/sitemap";

// https://astro.build/config
export default defineConfig({
    site: SITE.url,
    integrations: [
        sitemap({
            filter: shouldIncludeInSitemap,
            customPages: SITEMAP_CUSTOM_PAGES,
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    redirects: {
        "/projects": "/projects/page/1",
        "/projects/page/": "/projects/page/1",
        "/blogs": "/blogs/page/1",
        "/blogs/page/": "/blogs/page/1",
    },
});

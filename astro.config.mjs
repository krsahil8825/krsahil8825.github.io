// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import { SITE_META } from "./src/config/site-config";

// https://astro.build/config
export default defineConfig({
    site: SITE_META.url,
    integrations: [
        sitemap({
            filter: (page) => page !== `${SITE_META.url}/404`,
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

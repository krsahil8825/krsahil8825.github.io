// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import { SITE } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
    site: SITE.url,
    integrations: [
        sitemap({
            filter: (page) => !page.includes("404"),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});

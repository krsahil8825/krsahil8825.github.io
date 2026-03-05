import { globby } from "globby";
import path from "node:path";

export async function getPages() {
    const files = await globby([
        "src/pages/**/*.{astro,md,mdx,html}",
        "!src/pages/**/[[]*[]]*.*"
    ]);

    return files.map((file: string) => {

        let route = file
            .replace("src/pages", "")
            .replace(/\.(astro|md|mdx|html)$/, "")
            .replace(/\/index$/, "");

        if (route === "") route = "/";

        return { url: route };

    });
}

export async function getStaticImages() {

    const files = await globby([
        "public/**/*.{png,jpg,jpeg,webp,avif,gif}",
        "!public/**/*.svg"
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
import { SITE } from "./site";

export interface SEOProps {
    pType?: "article" | "website";
    pTitle?: string;
    pDescription?: string;
    pPath?: string;
    pKeywords?: string[];
    pImagePath?: string;
    pTags?: string[];
    pSlug?: string;
    pPublishedTime?: string;
    pModifiedTime?: string;
    isIndexable?: boolean;
}

export interface ResolvedSEO {
    metaType: "article" | "website";
    isArticle: boolean;
    metaTitle: string;
    metaDescription: string;
    metaURL: string;
    metaKeywords: string;
    metaImage: string;
    metaImageMimeType: string;
    indexable: boolean;
}

function inferImageMimeType(imageUrl: string): string {
    const normalizedUrl = imageUrl.toLowerCase();

    if (normalizedUrl.endsWith(".svg")) return "image/svg+xml";
    if (normalizedUrl.endsWith(".webp")) return "image/webp";
    if (normalizedUrl.endsWith(".jpg") || normalizedUrl.endsWith(".jpeg")) return "image/jpeg";
    if (normalizedUrl.endsWith(".gif")) return "image/gif";
    return "image/png";
}

export function resolveSEO(props: SEOProps = {}): ResolvedSEO {
    const {
        pType = "website",
        pTitle = "",
        pDescription = "",
        pPath = "",
        pKeywords = [],
        pImagePath = "",
        pTags = [],
        pSlug = "",
        isIndexable = true,
    } = props;

    const metaType: "article" | "website" = pType === "article" ? pType : "website";
    const isArticle = metaType === "article";
    const metaTitle = pTitle ? `${pTitle} | ${SITE.fullName}` : `${SITE.fullName} | ${SITE.role}`;
    const metaDescription = pDescription ? pDescription : SITE.description;
    const metaURL = pPath && pSlug ? `${SITE.url}/${pPath}/${pSlug}` : pPath ? `${SITE.url}/${pPath}` : SITE.url;
    const metaKeywords = Array.from(new Set([...SITE.keywords, ...pKeywords, ...pTags])).join(", ");
    const metaImage = pImagePath ? `${SITE.url}${pImagePath}` : `${SITE.url}${SITE.siteIcons.png}`;
    const metaImageMimeType = inferImageMimeType(metaImage);
    const indexable = isIndexable;

    return {
        metaType,
        isArticle,
        metaTitle,
        metaDescription,
        metaURL,
        metaKeywords,
        metaImage,
        metaImageMimeType,
        indexable,
    };
}

const baseGraph = [
    {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        url: SITE.url,
        name: SITE.fullName,
        publisher: {
            "@id": `${SITE.url}#person`,
        },
    },
    {
        "@type": "Person",
        "@id": `${SITE.url}#person`,
        name: "Kumar Sahil",
        alternateName: [
            "Sahil",
            "Sahil Kumar",
            "Kumar Sahil",
            "Kr Sahil",
            "KrSahil",
            "krsahil8825",
            "Kumar Sahil Developer",
            "Sahil Developer",
        ],
        url: SITE.url,
        image: `${SITE.url}${SITE.profilePic}`,
        jobTitle: SITE.role,
        description: SITE.description,
        knowsAbout: [
            "Python",
            "Java",
            "Django",
            "Flask",
            "SQL",
            "Backend Development",
            "REST APIs",
            "Data Structures",
            "Algorithms",
            "Web Development",
        ],
        sameAs: [SITE.social.github.url, SITE.social.linkedin.url, SITE.social.twitter.url, SITE.social.instagram.url],
    },
];

export function createStructuredData(props: SEOProps, resolved: ResolvedSEO) {
    const {
        pType = "website",
        pTitle = "",
        pDescription = "",
        pPath = "",
        pImagePath = "",
        pTags = [],
        pPublishedTime = "",
        pModifiedTime = "",
    } = props;

    const normalizedPath = pPath.replace(/^\/+|\/+$/g, "");
    const pathSegments = normalizedPath ? normalizedPath.split("/") : [];
    const breadcrumbGraph =
        pathSegments.length > 0
            ? {
                "@type": "BreadcrumbList",
                "@id": `${resolved.metaURL}#breadcrumb`,
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: SITE.url,
                    },
                    ...pathSegments.map((segment, index) => ({
                        "@type": "ListItem",
                        position: index + 2,
                        name: segment
                            .split("-")
                            .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
                            .join(" "),
                        item: `${SITE.url}/${pathSegments.slice(0, index + 1).join("/")}`,
                    })),
                ],
            }
            : null;

    const webPageGraph = {
        "@type": "WebPage",
        "@id": `${resolved.metaURL}#webpage`,
        url: resolved.metaURL,
        name: resolved.metaTitle,
        description: resolved.metaDescription,
        inLanguage: SITE.locale,
        isPartOf: {
            "@id": `${SITE.url}#website`,
        },
        primaryImageOfPage: {
            "@id": `${resolved.metaURL}#primaryimage`,
        },
    };

    const imageObjectGraph = {
        "@type": "ImageObject",
        "@id": `${resolved.metaURL}#primaryimage`,
        url: resolved.metaImage,
        contentUrl: resolved.metaImage,
        inLanguage: SITE.locale,
        caption: resolved.metaTitle,
    };

    const articleGraph =
        resolved.isArticle && pType === "article" && pTitle && pDescription && pPath && pImagePath && pPublishedTime
            ? {
                "@type": "Article",
                "@id": `${resolved.metaURL}#article`,
                mainEntityOfPage: {
                    "@id": `${resolved.metaURL}#webpage`,
                },
                headline: resolved.metaTitle,
                description: resolved.metaDescription,
                image: {
                    "@id": `${resolved.metaURL}#primaryimage`,
                },
                datePublished: pPublishedTime,
                dateModified: pModifiedTime || pPublishedTime,
                keywords: pTags.join(", "),
                author: {
                    "@id": `${SITE.url}#person`,
                },
                publisher: {
                    "@id": `${SITE.url}#website`,
                },
            }
            : null;

    return {
        "@context": "https://schema.org",
        "@graph": articleGraph
            ? [...baseGraph, webPageGraph, imageObjectGraph, ...(breadcrumbGraph ? [breadcrumbGraph] : []), articleGraph]
            : [...baseGraph, webPageGraph, imageObjectGraph, ...(breadcrumbGraph ? [breadcrumbGraph] : [])],
    };
}

export function createListingSEO(options: {
    title: string;
    description: string;
    path: string;
    keywords: string[];
    imagePath: string;
}): SEOProps {
    return {
        pType: "website",
        pTitle: options.title,
        pDescription: options.description,
        pPath: options.path,
        pKeywords: options.keywords,
        pImagePath: options.imagePath,
        pTags: [],
        pSlug: "",
        pPublishedTime: "",
        pModifiedTime: "",
        isIndexable: true,
    };
}

export function createArticleSEO(options: {
    title: string;
    description: string;
    path: string;
    keywords: string[];
    imagePath: string;
    tags: string[];
    slug: string;
    publishedTime: string;
    modifiedTime?: string;
}): SEOProps {
    return {
        pType: "article",
        pTitle: options.title,
        pDescription: options.description,
        pPath: options.path,
        pKeywords: options.keywords,
        pImagePath: options.imagePath,
        pTags: options.tags,
        pSlug: options.slug,
        pPublishedTime: options.publishedTime,
        pModifiedTime: options.modifiedTime ?? "",
        isIndexable: true,
    };
}

export function createNotFoundSEO(): SEOProps {
    return {
        pType: "website",
        pTitle: "404 - Page Not Found",
        pDescription: "Oops! The page you're looking for doesn't exist. Return to the homepage and explore our content.",
        pPath: "404",
        pKeywords: ["404", "page not found", "error", "krsahil 404", "sahil 404"],
        pImagePath: "/site/404-hero.png",
        pTags: [],
        pSlug: "",
        pPublishedTime: "",
        pModifiedTime: "",
        isIndexable: false,
    };
}

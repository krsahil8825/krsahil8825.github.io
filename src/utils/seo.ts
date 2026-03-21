import { IDENTITY, PROFESSION, SEO, SITE_META, BRANDING } from "../config/site-config.ts";
import { LINKS } from "../config/social-config.ts";
import { getSkillNames } from "../config/skills-config.ts";

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
    const metaTitle = pTitle ? `${pTitle} | ${IDENTITY.name}` : `${IDENTITY.name} | ${PROFESSION.title}`;
    const metaDescription = pDescription ? pDescription : SEO.description;
    const metaURL = pPath && pSlug ? `${SITE_META.url}/${pPath}/${pSlug}` : pPath ? `${SITE_META.url}/${pPath}` : SITE_META.url;
    const metaKeywords = Array.from(new Set([...SEO.keywords, ...IDENTITY.aliases, ...pKeywords, ...pTags])).join(", ");
    const metaImage = pImagePath ? `${SITE_META.url}${pImagePath}` : `${SITE_META.url}${BRANDING.icons.png}`;
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
        "@id": `${SITE_META.url}#website`,
        url: SITE_META.url,
        name: IDENTITY.name,
        alternateName: IDENTITY.aliases,
        keywords: SEO.keywords.join(", "),
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_META.url}/blogs/page/{search_term_string}`,
            "query-input": "required name=search_term_string",
        },
        publisher: {
            "@id": `${SITE_META.url}#person`,
        },
    },
    {
        "@type": "Person",
        "@id": `${SITE_META.url}#person`,
        name: "Kumar Sahil",
        alternateName: IDENTITY.aliases,
        url: SITE_META.url,
        image: `${SITE_META.url}${IDENTITY.profileImage}`,
        jobTitle: PROFESSION.title,
        description: SEO.description,
        sameAs: [LINKS.github, LINKS.linkedin, LINKS.twitter, LINKS.instagram],
        knowsAbout: getSkillNames(),
        keywords: SEO.keywords.join(", "),
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
                        item: SITE_META.url,
                    },
                    ...pathSegments.map((segment, index) => ({
                        "@type": "ListItem",
                        position: index + 2,
                        name: segment
                            .split("-")
                            .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
                            .join(" "),
                        item: `${SITE_META.url}/${pathSegments.slice(0, index + 1).join("/")}`,
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
        inLanguage: SITE_META.locale,
        isPartOf: {
            "@id": `${SITE_META.url}#website`,
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
        inLanguage: SITE_META.locale,
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
                    "@id": `${SITE_META.url}#person`,
                },
                publisher: {
                    "@id": `${SITE_META.url}#website`,
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

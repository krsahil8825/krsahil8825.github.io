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
    indexable: boolean;
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
    const indexable = isIndexable;

    return {
        metaType,
        isArticle,
        metaTitle,
        metaDescription,
        metaURL,
        metaKeywords,
        metaImage,
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
        pPublishedTime = "",
        pModifiedTime = "",
    } = props;

    const articleGraph =
        resolved.isArticle && pType === "article" && pTitle && pDescription && pPath && pImagePath && pPublishedTime
            ? {
                  "@type": "Article",
                  "@id": `${resolved.metaURL}#article`,
                  mainEntityOfPage: {
                      "@type": "WebPage",
                      "@id": resolved.metaURL,
                  },
                  headline: resolved.metaTitle,
                  description: resolved.metaDescription,
                  image: resolved.metaImage,
                  datePublished: pPublishedTime,
                  dateModified: pModifiedTime || pPublishedTime,
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
        "@graph": articleGraph ? [...baseGraph, articleGraph] : baseGraph,
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

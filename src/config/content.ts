export const DEFAULT_MAX_ITEMS = 6;

type DatedContent = {
    data: {
        publishedTime: string;
    };
};

type SluggedContent = {
    slug: string;
};

export function sortByPublishedTimeDesc<T extends DatedContent>(items: T[]): T[] {
    return [...items].sort((a, b) => new Date(b.data.publishedTime).getTime() - new Date(a.data.publishedTime).getTime());
}

export function buildPaginatedPaths<T extends DatedContent>(items: T[], maxItems: number = DEFAULT_MAX_ITEMS) {
    const sortedItems = sortByPublishedTimeDesc(items);
    const totalPages = Math.ceil(sortedItems.length / maxItems);

    return Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return {
            params: { page: String(page) },
            props: {
                page,
                totalPages,
                posts: sortedItems.slice(i * maxItems, i * maxItems + maxItems),
            },
        };
    });
}

export function buildSlugPaths<T extends DatedContent & SluggedContent>(items: T[], itemPropName: string) {
    const sortedItems = sortByPublishedTimeDesc(items);
    const slugs = sortedItems.map((item) => item.slug);

    return sortedItems.map((item, index) => ({
        params: { slug: item.slug },
        props: {
            [itemPropName]: item,
            index,
            total: sortedItems.length,
            slugs,
        },
    }));
}

export function getAdjacentSlugs(index: number, total: number, slugs: string[]) {
    return {
        prevSlug: index > 0 ? slugs[index - 1] : null,
        nextSlug: index < total - 1 ? slugs[index + 1] : null,
    };
}

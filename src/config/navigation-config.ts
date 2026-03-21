export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/projects/page/1" },
    { label: "Blogs", href: "/blogs/page/1" },
    { label: "Contact", href: "/#contact" },
];

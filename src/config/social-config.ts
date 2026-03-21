export interface SocialLink {
    icon: string;
    href: string;
    label: string;
}

export const socialICONS = "/icons/social.svg";

// only for seo components, where username is required instead of full link
export const USERNAME = {
    twitter: "krsahil8825",
}

export const LINKS = {
    discord: "https://discord.com/users/krsahil8825",
    dailyDev: "https://app.daily.dev/krsahil8825",
    devTo: "https://dev.to/krsahil8825",
    email: "mailto:krsahil8825@gmail.com",
    github: "https://github.com/krsahil8825",
    hashnode: "https://hashnode.com/@krsahil8825",
    instagram: "https://instagram.com/krsahil8825",
    leetcode: "https://leetcode.com/krsahil8825",
    linkedin: "https://linkedin.com/in/krsahil8825",
    reddit: "https://reddit.com/user/krsahil8825",
    medium: "https://krsahil8825.medium.com",
    twitter: "https://x.com/krsahil8825",
    youtube: "https://youtube.com/@krsahil8825",
}

export const SOCIAL_LINKS: SocialLink[] = [
    { icon: "/icons/discord.svg", href: LINKS.discord, label: "Discord" },
    { icon: "/icons/daily.dev.svg", href: LINKS.dailyDev, label: "daily.dev" },
    { icon: "/icons/dev.to.svg", href: LINKS.devTo, label: "Dev.to" },
    { icon: "/icons/email.svg", href: LINKS.email, label: "Email" },
    { icon: "/icons/github.svg", href: LINKS.github, label: "GitHub" },
    { icon: "/icons/hashnode.svg", href: LINKS.hashnode, label: "Hashnode" },
    { icon: "/icons/Instagram.svg", href: LINKS.instagram, label: "Instagram" },
    { icon: "/icons/leetcode.svg", href: LINKS.leetcode, label: "LeetCode" },
    { icon: "/icons/linkedin.svg", href: LINKS.linkedin, label: "LinkedIn" },
    { icon: "/icons/reddit.svg", href: LINKS.reddit, label: "Reddit" },
    { icon: "/icons/medium.svg", href: LINKS.medium, label: "Medium" },
    { icon: "/icons/twitter-x.svg", href: LINKS.twitter, label: "X" },
    { icon: "/icons/youtube.svg", href: LINKS.youtube, label: "YouTube" },
];

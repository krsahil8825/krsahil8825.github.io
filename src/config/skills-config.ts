export interface SkillItem {
    name: string;
    icon: string;
}

export interface SkillGroup {
    category: string;
    items: SkillItem[];
}

export const SKILLS: SkillGroup[] = [
    {
        category: "Programming Languages",
        items: [
            { name: "Python", icon: "/icons/python.svg" },
            { name: "Java", icon: "/icons/java.svg" },
            { name: "C", icon: "/icons/c.svg" },
            { name: "C++", icon: "/icons/cpp.svg" },
            { name: "JavaScript", icon: "/icons/javascript.svg" },
        ],
    },
    {
        category: "Backend Frameworks",
        items: [
            { name: "Django", icon: "/icons/django.svg" },
            { name: "Flask", icon: "/icons/flask.svg" },
        ],
    },
    {
        category: "DataBase",
        items: [
            { name: "MySQL", icon: "/icons/mysql.svg" },
            { name: "SQLite", icon: "/icons/sqlite.svg" },
        ],
    },
    {
        category: "Computer Science Fundamentals",
        items: [
            { name: "Data Structures", icon: "/icons/datastructures.svg" },
            { name: "Algorithms", icon: "/icons/algorithm.svg" },
            { name: "Operating Systems", icon: "/icons/operatingsystems.svg" },
            { name: "DBMS", icon: "/icons/database.svg" },
            { name: "OOP", icon: "/icons/oop.svg" },
        ],
    },
    {
        category: "Tools & Technologies",
        items: [
            { name: "Git", icon: "/icons/git.svg" },
            { name: "GitHub", icon: "/icons/github.svg" },
            { name: "Docker", icon: "/icons/docker.svg" },
            { name: "Postman", icon: "/icons/postman.svg" },
            { name: "Ubuntu", icon: "/icons/ubuntu.svg" },
        ],
    },
    {
        category: "Web Technologies",
        items: [
            { name: "HTML", icon: "/icons/html.svg" },
            { name: "CSS", icon: "/icons/css.svg" },
            { name: "Bootstrap", icon: "/icons/bootstrap.svg" },
            { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
            { name: "React", icon: "/icons/react.svg" },
            { name: "Astro", icon: "/icons/astro.svg" },
            { name: "Jekyll", icon: "/icons/jekyll.svg" },
        ],
    },
];

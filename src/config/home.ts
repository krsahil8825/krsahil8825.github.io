export interface Certification {
    title: string;
    issuer: string;
    issued: string;
    logo: string;
    credentialId?: string;
    credentialUrl?: string;
}

export interface EducationItem {
    institution: string;
    degree: string;
    period: string;
    logo: string;
    description: string;
}

export interface SkillItem {
    name: string;
    icon: string;
}

export interface SkillGroup {
    category: string;
    items: SkillItem[];
}

export const CERTIFICATIONS: Certification[] = [
    {
        title: "CS50's Introduction to Computer Science",
        issuer: "Harvard University",
        issued: "Nov 2025",
        logo: "/education/harvard-university-logo.png",
        credentialId: "6294e7ff-2b48-48cc-af3a-bf421cd71eb3",
        credentialUrl: "https://cs50.harvard.edu/certificates/6294e7ff-2b48-48cc-af3a-bf421cd71eb3",
    },
    {
        title: "CS50's Web Programming with Python and JavaScript",
        issuer: "Harvard University",
        issued: "Oct 2025",
        logo: "/education/harvard-university-logo.png",
        credentialId: "dd30bb57-403e-45c9-b7f5-0809a929b0a0",
        credentialUrl: "https://cs50.harvard.edu/certificates/dd30bb57-403e-45c9-b7f5-0809a929b0a0",
    },
    {
        title: "CS50's Introduction to Databases with SQL",
        issuer: "Harvard University",
        issued: "Jul 2025",
        logo: "/education/harvard-university-logo.png",
        credentialId: "f08f35ed-65a8-4283-9453-1c1e88218dec",
        credentialUrl: "https://cs50.harvard.edu/certificates/f08f35ed-65a8-4283-9453-1c1e88218dec",
    },
    {
        title: "CS50's Introduction to Programming with Python",
        issuer: "Harvard University",
        issued: "Jul 2025",
        logo: "/education/harvard-university-logo.png",
        credentialId: "772e1bdd-75a4-4b16-b201-565f2bf0489d",
        credentialUrl: "https://cs50.harvard.edu/certificates/772e1bdd-75a4-4b16-b201-565f2bf0489d",
    },
    {
        title: "CS50's Introduction to Programming with Scratch",
        issuer: "Harvard University",
        issued: "May 2024",
        logo: "/education/harvard-university-logo.png",
        credentialId: "5d32c428-8f82-40b1-b4da-b6dd94c5cc59",
        credentialUrl: "https://cs50.harvard.edu/certificates/5d32c428-8f82-40b1-b4da-b6dd94c5cc59",
    },
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        issued: "May 2025",
        logo: "/education/freecodecamp-logo.png",
        credentialUrl: "https://www.freecodecamp.org/certification/krsahil8825/responsive-web-design",
    },
    {
        title: "Database Management System",
        issuer: "IIT Kharagpur (NPTEL)",
        issued: "Sep 2025",
        logo: "/education/iit-kharagpur-logo.png",
        credentialId: "NPTEL25CS145S544600323",
        credentialUrl:
            "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs145/Course/NPTEL25CS145S54460032309170168.pdf",
    },
    {
        title: "Data Structures and Algorithms",
        issuer: "Udemy",
        issued: "March 2026",
        logo: "/education/udemy-logo.png",
        credentialId: "UC-bb535efd-29a0-4947-a553-d01042591421",
        credentialUrl: "https://www.udemy.com/certificate/UC-bb535efd-29a0-4947-a553-d01042591421/",
    },
];

export const parseIssuedDate = (issued: string): number => {
    return new Date(`01 ${issued}`).getTime();
};

export const SORTED_CERTIFICATIONS: Certification[] = [...CERTIFICATIONS].sort((a, b) => parseIssuedDate(b.issued) - parseIssuedDate(a.issued));

export const EDUCATION: EducationItem[] = [
    {
        institution: "Amity University Patna",
        degree: "Bachelor's in Computer Application",
        period: "Jul 2024 - Expected Jul 2027",
        logo: "/education/amity-university-patna-logo.png",
        description: "BCA degree focusing on Computer Applications, Software Development, and IT fundamentals.",
    },
    {
        institution: "Bihar School Examination Board (BSEB)",
        degree: "Senior Secondary Education",
        period: "Aug 2022 - Jun 2024",
        logo: "/education/bihar-school-examination-board-logo.png",
        description: "Grades 11-12 in Science Stream (PCM - Physics, Chemistry, Mathematics).",
    },
    {
        institution: "Central Board of Secondary Education (CBSE)",
        degree: "Primary & Secondary Education",
        period: "Apr 2011 - Jul 2021",
        logo: "/education/central-board-of-secondary-education-logo.png",
        description: "Grades 1-10 with General Education covering diverse subjects.",
    },
];

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

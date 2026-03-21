export interface Certification {
    title: string;
    issuer: string;
    issued: string;
    logo: string;
    credentialId?: string;
    credentialUrl?: string;
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

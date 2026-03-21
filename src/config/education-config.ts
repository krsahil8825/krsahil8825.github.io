export interface EducationItem {
    institution: string;
    degree: string;
    period: string;
    logo: string;
    description: string;
}

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
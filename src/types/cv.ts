export interface PersonalInfo {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    photoURL: string | null;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
    achievements: string;
}

export interface Skill {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Skills {
    technical: string[]; // Simplification: array of strings for tags
    soft: string[];
    languages: Skill[];
}

export interface CVData {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skills;
    // Add other sections as needed
}

export interface Theme {
    color: string;
    font: string;
}

export interface CV {
    id: string;
    title: string;
    templateId: string;
    theme: Theme; // New field
    data: CVData;
    createdAt: any; // Firestore Timestamp
    updatedAt: any;
    userId: string;
    isPublic?: boolean;
}

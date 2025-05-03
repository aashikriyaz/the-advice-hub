
export type ProblemCategory = 
  | "Career" 
  | "Relationship" 
  | "Technical" 
  | "Finance" 
  | "Health" 
  | "Education" 
  | "Other";

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: ProblemCategory;
  name?: string;
  email?: string;
  isAnonymous: boolean;
  createdAt: string;
  status: "pending" | "approved" | "rejected" | "solved";
}

export const PROBLEM_CATEGORIES: ProblemCategory[] = [
  "Career",
  "Relationship",
  "Technical",
  "Finance",
  "Health",
  "Education",
  "Other"
];

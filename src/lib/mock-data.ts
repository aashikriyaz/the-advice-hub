
import { Problem, ProblemCategory } from "@/types/problem";

// Mock database for storing problems
class MockDatabase {
  private problems: Problem[] = [];
  private idCounter: number = 1;

  addProblem(problem: Omit<Problem, "id" | "createdAt" | "status">): Problem {
    const newProblem: Problem = {
      ...problem,
      id: `prob-${this.idCounter++}`,
      createdAt: new Date().toISOString(),
      status: "pending"
    };
    
    this.problems.push(newProblem);
    return newProblem;
  }

  getAllProblems(): Problem[] {
    return [...this.problems];
  }

  getProblemsByCategory(category: ProblemCategory): Problem[] {
    return this.problems.filter(p => p.category === category);
  }

  getProblemById(id: string): Problem | undefined {
    return this.problems.find(p => p.id === id);
  }

  // Adding some sample data
  initialize() {
    if (this.problems.length === 0) {
      this.addProblem({
        title: "Career change at 35",
        description: "I've been working in marketing for 10 years but want to transition to software development. Is it too late to make such a drastic career change?",
        category: "Career",
        isAnonymous: true
      });
      
      this.addProblem({
        title: "React component optimization",
        description: "My React application is getting slow as it grows. What are the best practices for optimizing performance of complex components with lots of state?",
        category: "Technical",
        name: "Alex",
        email: "alex@example.com",
        isAnonymous: false
      });
      
      this.addProblem({
        title: "Financial planning for early retirement",
        description: "I'm 30 years old and want to retire by 45. Currently saving 40% of my income. What investment strategies should I consider to reach this goal?",
        category: "Finance",
        isAnonymous: true
      });
    }
  }
}

// Create and initialize the database
const mockDB = new MockDatabase();
mockDB.initialize();

// Export functions to interact with the mock database
export const submitProblem = (problem: Omit<Problem, "id" | "createdAt" | "status">) => {
  return mockDB.addProblem(problem);
};

export const getAllProblems = () => {
  return mockDB.getAllProblems();
};

export const getProblemsByCategory = (category: ProblemCategory) => {
  return mockDB.getProblemsByCategory(category);
};

export const getProblemById = (id: string) => {
  return mockDB.getProblemById(id);
};

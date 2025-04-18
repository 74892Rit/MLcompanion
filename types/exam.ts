export interface Question {
  id: string;
  type: "multiple-choice" | "short-answer" | "true-false";
  topic: string; // for frontend display
  questionText: string; // previously 'text'
  difficulty: "easy" | "medium" | "hard"; // assumed based on usage
  points: number;
  options?: {
    id: string;
    text: string;
    isCorrect?: boolean;
  }[];
  correctAnswer?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  description?: string;
  teacherId: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
  status: "draft" | "published" | "active" | "completed";
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  answers: {
    questionId: string;
    selectedOption?: string;
    shortAnswer?: string;
    isCorrect?: boolean;
  }[];
  totalMarks: number;
  obtainedMarks: number;
  status: "in-progress" | "submitted" | "evaluated";
  startTime: Date;
  submitTime?: Date;
  duration: number;
}

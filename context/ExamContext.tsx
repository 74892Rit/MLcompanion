import { Question } from "@/types/exam";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const s = () => {
  return <div>s</div>;
};

export default s;

// Exam Interface
export interface MLExam {
  questions: Question[];
  id: string;
  subject: string;
  title: string;
  teacher: string;
  date: string;
  semester: string;
  duration: string;
  totalMarks: number;
  description: string;
  totalStudents: number;
  status: string;
}

// Context Type
interface ExamContextType {
  exams: MLExam[];
  addExam: (exam: MLExam) => void;
  removeExam: (examId: string) => void;
  updateExam: (examId: string, updatedExam: Partial<MLExam>) => void;
}

// Create Context
const ExamContext = createContext<ExamContextType | undefined>(undefined);

// Context Provider Component
export const ExamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [exams, setExams] = useState<MLExam[]>(() => {
    // Initialize from localStorage on first load
    const savedExams = localStorage.getItem("mlExams");
    return savedExams ? JSON.parse(savedExams) : [];
  });

  // Persist exams to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mlExams", JSON.stringify(exams));
  }, [exams]);

  // Add a new exam
  const addExam = (newExam: MLExam) => {
    setExams((prevExams) => {
      // Ensure no duplicate exams
      const existingExamIndex = prevExams.findIndex(
        (exam) => exam.id === newExam.id
      );

      if (existingExamIndex > -1) {
        // If exam already exists, replace it
        const updatedExams = [...prevExams];
        updatedExams[existingExamIndex] = newExam;
        return updatedExams;
      }

      // Add new exam
      return [...prevExams, newExam];
    });
  };

  // Remove an exam
  const removeExam = (examId: string) => {
    setExams((prevExams) => prevExams.filter((exam) => exam.id !== examId));
  };

  // Update an existing exam
  const updateExam = (examId: string, updatedExam: Partial<MLExam>) => {
    setExams((prevExams) =>
      prevExams.map((exam) =>
        exam.id === examId ? { ...exam, ...updatedExam } : exam
      )
    );
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        addExam,
        removeExam,
        updateExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

// Custom hook to use the exam context
export const useExams = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExams must be used within an ExamProvider");
  }
  return context;
};

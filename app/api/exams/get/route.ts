import { NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import Exam from "@/database/models/exam.model";
import "@/database/models/question.model";
// import User from "@/database/models/user.model";
export async function GET() {
  try {
    console.log("✅ Fetching exams API hit");

    await connectDB();
    console.log("✅ Connected to database");

    const examResults = await Exam.find().lean();
    console.log(`✅ Found ${examResults.length} exams in database`);

    if (!examResults || examResults.length === 0) {
      console.log("⚠️ No exams found in database");
      return NextResponse.json([]);
    }

    console.log(
      "📌 Sample exam from DB:",
      JSON.stringify(examResults[0], null, 2).substring(0, 200)
    );

    const formattedExams = examResults
      .filter((exam) => exam._id)
      .map((exam) => {
        let formattedDate = "";
        try {
          const examDate = new Date(exam.date);
          formattedDate = examDate.toISOString().split("T")[0];
        } catch (error) {
          console.error("❌ Error formatting date:", error);
          formattedDate = "Invalid Date";
        }

        return {
          id: exam._id.toString(),
          subject: exam.title || "Untitled Exam",
          teacher: {
            name: exam.createdBy ? "Instructor" : "TBD",
          },
          date: formattedDate,
          duration: exam.duration || 0,
          totalMarks: exam.totalMarks || 100,
          semester: exam.semester || "",
          status: exam.status || "Upcoming",
        };
      });

    console.log(`✅ Returning ${formattedExams.length} formatted exams`);

    return NextResponse.json(formattedExams);
  } catch (error: any) {
    console.error("❌ Error fetching exams:", error.message);
    return NextResponse.json([], { status: 500 });
  }
}

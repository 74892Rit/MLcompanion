import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectDB from "@/database/mongoose";
import Exam from "@/database/models/exam.model";
import { isValidObjectId } from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const token = await getToken({ req });

    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const { examId } = params;
    const examId = (await params).examId;

    if (!examId || !isValidObjectId(examId)) {
      return NextResponse.json(
        { error: "Invalid or missing exam ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const exam = (await Exam.findById(examId).lean()) as {
      _id: string;
      title: string;
      duration: number;
      questions: any[];
    } | null;

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: exam._id.toString(),
      title: exam.title,
      duration: exam.duration,
      questions: exam.questions,
    });
  } catch (error: any) {
    console.error("❌ Error fetching exam:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch exam" },
      { status: 500 }
    );
  }
}

// app/exam/[examId]/page.tsx
import ExamPage from "@/components/student/ExamPage";

export default async function ExamWrapper({
  params,
}: {
  params: { examId: string };
}) {
  const examId = (await params).examId;
  return <ExamPage examId={examId} />;
}

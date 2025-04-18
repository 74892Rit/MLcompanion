import { MLExam } from "@/context/ExamContext";

const ExamDetailsModal = ({
  exam,
  onClose,
}: {
  exam: MLExam | null;
  onClose: () => void;
}) => {
  if (!exam) return null;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Exam Details: {exam.title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Semester</p>
              <p className="text-gray-900">{exam.semester}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="text-gray-900">{exam.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>
              <p className="text-gray-900">{exam.totalStudents}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                  exam.status
                )}`}
              >
                {exam.status}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Questions
            </h3>
            {exam.questions.length > 0 ? (
              <div className="space-y-3">
                {exam.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-lg bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        Q{index + 1}: {question.topic}
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">
                      {question.questionText}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No questions available for this exam.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExamDetailsModal;

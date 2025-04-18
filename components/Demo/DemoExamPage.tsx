/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";

export default function CodingExam() {
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [code, setCode] = useState(
    "// Write your code here\n\nfunction solution() {\n  // Your implementation\n}\n"
  );

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Navigation handlers
  const goToPrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < 5) {
      // Assuming 5 questions total
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} transition-colors duration-200`}
    >
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between border-b border-gray-200 pb-4 dark:border-gray-700 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Practical Examination 5th Sem
            </h1>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Student Name (Optional)"
                className={`rounded-lg border px-3 py-2 ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <div
              className={`rounded-lg px-4 py-2 font-mono text-xl ${timeLeft < 300 ? "text-red-500" : ""} ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </header>

        {/* Question Section */}
        <section
          className={`mb-6 rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
              Question {currentQuestion} of 5
            </h2>
          </div>
          <h3 className="mb-2 text-xl font-bold">
            Implement a Binary Search Algorithm
          </h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Write a function that implements the binary search algorithm. The
            function should take a sorted array and a target value as input and
            return the index of the target value in the array. If the target
            value is not found, return -1.
          </p>
        </section>

        {/* Code Editor */}
        <section
          className={`mb-6 overflow-hidden rounded-xl shadow-sm ${darkMode ? "border border-gray-700 bg-gray-800" : "border border-gray-200 bg-white"}`}
        >
          <div
            className={`px-4 py-2 ${darkMode ? "bg-gray-900" : "bg-gray-100"} border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <span className="font-medium">Code Editor</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`h-80 w-full p-4 font-mono text-sm focus:outline-none ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
            spellCheck="false"
          />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <button
              onClick={goToPrevious}
              disabled={currentQuestion === 1}
              className={`flex items-center rounded-lg px-4 py-2 ${
                currentQuestion === 1
                  ? "cursor-not-allowed opacity-50"
                  : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="mr-1 size-5" />
              Previous
            </button>
            <button
              onClick={goToNext}
              disabled={currentQuestion === 5}
              className={`flex items-center rounded-lg px-4 py-2 ${
                currentQuestion === 5
                  ? "cursor-not-allowed opacity-50"
                  : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Next
              <ChevronRight className="ml-1 size-5" />
            </button>
          </div>
          <button
            className={`rounded-lg px-6 py-2 font-medium ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

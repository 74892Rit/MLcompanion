/* eslint-disable no-unused-vars */
"use client";
import { useState } from "react";
// import { CodeExecutionProvider } from "@/components/Editorpage/CodeExecutionContext";
import Editor from "@/components/Editorpage/Editor";
import Console from "@/components/Editorpage/Console";
import {
  Terminal,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { PyodideProvider } from "@/components/Editorpage/PyodideProvider";

export default function EditorPage() {
  // More flexible state to control layout
  const [consoleSize, setConsoleSize] = useState("medium"); // "small", "medium", "large", "full"

  // Compute dynamic heights based on console size
  const getLayoutClasses = () => {
    switch (consoleSize) {
      case "small":
        return { editor: "h-[70vh]", console: "h-[30vh]" };
      case "medium":
        return { editor: "h-[50vh]", console: "h-[50vh]" };
      case "large":
        return { editor: "h-[30vh]", console: "h-[70vh]" };
      case "full":
        return { editor: "h-0", console: "h-[calc(100vh-4rem)]" };
      default:
        return { editor: "h-[50vh]", console: "h-[50vh]" };
    }
  };

  const layoutClasses = getLayoutClasses();

  // Function to cycle through sizes
  const cycleConsoleSize = () => {
    const sizes = ["small", "medium", "large", "full"];
    const currentIndex = sizes.indexOf(consoleSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setConsoleSize(sizes[nextIndex]);
  };

  return (
    <PyodideProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Header Section */}
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md dark:from-blue-800 dark:to-indigo-900">
          <div className="flex items-center space-x-4">
            <Terminal className="size-10 text-white" />
            <h1 className="text-2xl font-bold text-white">Code Editor</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-50 dark:bg-blue-300/10">
              Python 3.x (Flask Backend)
            </span>
            <button
              onClick={cycleConsoleSize}
              className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
              title="Resize console"
            >
              {consoleSize === "full" ? (
                <Minimize2 size={18} />
              ) : (
                <Maximize2 size={18} />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Editor Section - Collapsible */}
          <div
            className={`transition-all duration-300 ${layoutClasses.editor} overflow-auto`}
          >
            {consoleSize !== "full" && <Editor />}
          </div>

          {/* Console Section */}
          <div
            className={`relative border-t border-gray-200 bg-gray-900 text-gray-100 transition-all duration-300 ${layoutClasses.console} dark:border-gray-700 dark:bg-black`}
          >
            {/* Resize Controls */}
            <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 space-x-2">
              <button
                onClick={() => setConsoleSize("small")}
                className={`rounded-md px-3 py-1 text-sm shadow-md ${
                  consoleSize === "small"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                25%
              </button>
              <button
                onClick={() => setConsoleSize("medium")}
                className={`rounded-md px-3 py-1 text-sm shadow-md ${
                  consoleSize === "medium"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                50%
              </button>
              <button
                onClick={() => setConsoleSize("large")}
                className={`rounded-md px-3 py-1 text-sm shadow-md ${
                  consoleSize === "large"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                75%
              </button>
              <button
                onClick={() => setConsoleSize("full")}
                className={`rounded-md px-3 py-1 text-sm shadow-md ${
                  consoleSize === "full"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Full
              </button>
            </div>

            <Console />
          </div>
        </div>
      </div>
    </PyodideProvider>
  );
}

// // page.tsx
// "use client";

// import { useState } from "react";
// import Console from "@/components/Editorpage/Console";
// import Editor from "@/components/Editorpage/Editor";
// import { Code2Icon } from "lucide-react";

// const Page = () => {
//   const [editorWidth, setEditorWidth] = useState("full");

//   const handleResize = (value: string) => {
//     setEditorWidth(value);
//   };

//   // Calculate editor container width based on selection
//   const getContainerWidth = () => {
//     switch (editorWidth) {
//       case "25%":
//         return "w-1/4";
//       case "50%":
//         return "w-1/2";
//       case "75%":
//         return "w-3/4";
//       case "full":
//       default:
//         return "w-full";
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
//       {/* Header - Fixed at top */}
//       <header className="bg-gradient-to-r from-purple-700 to-purple-500 p-3 text-white shadow-md">
//         <div className="mx-auto flex max-w-7xl items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Code2Icon />
//             <h1 className="text-lg font-semibold">Code Editor</h1>
//           </div>
//           <span className="rounded-full bg-purple-800 px-3 py-1 text-xs font-semibold">
//             Python 3.x (Flask Backend)
//           </span>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <main className="flex flex-1 flex-col overflow-hidden">
//         {/* Width Controls */}
//         <div className="border-b bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
//           <div className="mx-auto flex max-w-7xl justify-center gap-2">
//             {["25%", "50%", "75%", "Full"].map((value) => (
//               <button
//                 key={value}
//                 className={`rounded-md px-3 py-1.5 transition-colors ${
//                   editorWidth === value.toLowerCase()
//                     ? "bg-gray-200 font-medium dark:bg-gray-700"
//                     : "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
//                 }`}
//                 onClick={() => handleResize(value.toLowerCase())}
//               >
//                 {value}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Editor and Console Container */}
//         <div className="flex flex-1 flex-col overflow-hidden p-4">
//           <div
//             className={`mx-auto ${getContainerWidth()} flex h-full flex-col`}
//           >
//             {/* Editor takes up 70% of the available height by default */}
//             <div className="mb-4 h-[70%] shrink-0 grow">
//               <Editor />
//             </div>

//             {/* Console takes remaining space */}
//             <div className="h-[30%] shrink-0 grow">
//               <Console />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Page;

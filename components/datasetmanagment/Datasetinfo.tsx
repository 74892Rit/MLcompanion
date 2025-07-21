// "use client";
// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import useSWR from "swr";

// // Define the fetcher function
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch dataset info: ${response.status}`);
//   }
//   return response.json();
// };

// const DatasetInfo = ({
//   dataset,
//   onBack,
// }: {
//   dataset: string;
//   onBack: () => void;
// }) => {
//   const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

//   // Use SWR hook for data fetching with caching
//   const {
//     data: info,
//     error,
//     isLoading,
//   } = useSWR(
//     `${process.env.NEXT_PUBLIC_FLASK_API_URL}dataset-info?name=${encodeURIComponent(dataset)}`,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       dedupingInterval: 30000, // Cache for 30 seconds before allowing refetch
//       revalidateIfStale: false, // Don't automatically revalidate stale data
//     }
//   );

//   const toggleExpand = (key: string) => {
//     setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const renderInfo = (data: any) => {
//     return Object.entries(data).map(([key, value]) => {
//       const isObject = typeof value === "object" && value !== null;
//       const isExpanded = expandedKeys[key] || false;

//       return (
//         <div
//           key={key}
//           className="border-b border-gray-200 py-3 dark:border-gray-700"
//         >
//           <div
//             className={`flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800`}
//             onClick={() => isObject && toggleExpand(key)}
//           >
//             <span className="font-semibold capitalize text-gray-800 dark:text-gray-200">
//               {key}
//             </span>

//             {isObject && (
//               <span className="text-gray-500 dark:text-gray-400">
//                 {isExpanded ? (
//                   <ChevronUp size={18} />
//                 ) : (
//                   <ChevronDown size={18} />
//                 )}
//               </span>
//             )}
//           </div>

//           <div className="pl-4">
//             {isObject ? (
//               isExpanded && (
//                 <pre className="overflow-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800 dark:text-gray-300">
//                   {JSON.stringify(value, null, 2)}
//                 </pre>
//               )
//             ) : (
//               <p className="text-gray-700 dark:text-gray-300">
//                 {String(value)}
//               </p>
//             )}
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       <button
//         onClick={onBack}
//         className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
//       >
//         ← Back to Datasets
//       </button>

//       <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
//         Dataset Info: <span className="text-blue-500">{dataset}</span>
//       </h2>

//       {isLoading ? (
//         <p className="text-gray-600 dark:text-gray-400">
//           Loading dataset info...
//         </p>
//       ) : error ? (
//         <p className="text-red-500">Failed to fetch dataset info.</p>
//       ) : info ? (
//         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
//           {renderInfo(info)}
//         </div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-400">
//           No information available.
//         </p>
//       )}
//     </div>
//   );
// };

// export default DatasetInfo;
"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import useSWR from "swr";

// More robust fetcher with detailed error messages
const fetcher = async (url: string) => {
  try {
    console.log(`Fetching from: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      // Get more detailed error info
      const errorText = await response
        .text()
        .catch(() => "No error details available");
      throw new Error(
        `Failed to fetch dataset info: ${response.status} ${response.statusText}. Details: ${errorText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const DatasetInfo = ({
  dataset,
  onBack,
}: {
  dataset: string;
  onBack: () => void;
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    // Validate API URL on component mount
    const baseApiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;

    if (!baseApiUrl) {
      console.error(
        "NEXT_PUBLIC_FLASK_API_URL is not defined in environment variables"
      );
      return;
    }

    // Ensure the URL ends with a slash if needed
    const formattedBaseUrl = baseApiUrl.endsWith("/")
      ? baseApiUrl
      : `${baseApiUrl}/`;
    setApiUrl(formattedBaseUrl);
  }, []);

  const encodedDataset = encodeURIComponent(dataset);

  // Only fetch if we have both dataset and a valid API URL
  const fetchUrl =
    dataset && apiUrl ? `${apiUrl}dataset-info?name=${encodedDataset}` : null;

  const {
    data: info,
    error,
    isLoading,
  } = useSWR(fetchUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30000,
    revalidateIfStale: false,
    onError: (err) => console.error("SWR Error:", err),
  });

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderInfo = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      const isObject = typeof value === "object" && value !== null;
      const isExpanded = expandedKeys[key] || false;
      return (
        <div
          key={key}
          className="border-b border-gray-200 py-3 dark:border-gray-700"
        >
          <div
            className={`flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800`}
            onClick={() => isObject && toggleExpand(key)}
          >
            <span className="font-semibold capitalize text-gray-800 dark:text-gray-200">
              {key}
            </span>
            {isObject && (
              <span className="text-gray-500 dark:text-gray-400">
                {isExpanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            )}
          </div>
          <div className="pl-4">
            {isObject ? (
              isExpanded && (
                <pre className="overflow-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800 dark:text-gray-300">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {String(value)}
              </p>
            )}
          </div>
        </div>
      );
    });
  };

  // Show debugging information for API URL issues
  const renderApiDebugInfo = () => {
    if (!process.env.NEXT_PUBLIC_FLASK_API_URL) {
      return (
        <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} />
            <p className="font-medium">Environment Variable Missing</p>
          </div>
          <p className="mt-2 text-sm">
            NEXT_PUBLIC_FLASK_API_URL is not defined. Make sure to set this in
            your .env file.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
      >
        ← Back to Datasets
      </button>
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Dataset Info: <span className="text-blue-500">{dataset}</span>
      </h2>

      {renderApiDebugInfo()}

      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <div className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
          <p>Loading dataset info...</p>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          <p className="font-medium">Error loading dataset info:</p>
          <p className="mt-1 text-sm">{error.message}</p>
          <div className="mt-3 text-sm">
            <p className="font-medium">Debugging steps:</p>
            <ul className="ml-5 list-disc">
              <li>
                Check that NEXT_PUBLIC_FLASK_API_URL is correctly set in your
                .env file
              </li>
              <li>Verify the Flask API server is running and accessible</li>
              <li>
                Confirm the dataset-info endpoint exists and accepts the name
                parameter
              </li>
              <li>Check browser console for additional error details</li>
            </ul>
          </div>
          {fetchUrl && (
            <p className="mt-2 font-mono text-xs">Attempted URL: {fetchUrl}</p>
          )}
        </div>
      ) : info ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {renderInfo(info)}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No information available for this dataset.
        </p>
      )}
    </div>
  );
};

export default DatasetInfo;

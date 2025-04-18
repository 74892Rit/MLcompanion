"use client";
import { useState } from "react";

const DatasetPreview = () => {
  const [datasetName, setDatasetName] = useState("");
  const [preview, setPreview] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  const fetchPreview = async () => {
    if (!datasetName.trim()) {
      setError("Please enter a dataset name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/dataset-preview?name=${encodeURIComponent(datasetName)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (
        data.dataset &&
        Array.isArray(data.dataset) &&
        data.dataset.length > 0
      ) {
        setColumns(Object.keys(data.dataset[0])); // Extract column names
        setPreview(data.dataset); // Set dataset preview
      } else {
        setError("No data available or invalid format");
        setPreview([]);
        setColumns([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch or parse the data. Make sure it's valid JSON.");
      setPreview([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);

    const sortedData = [...preview].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return newDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      return newDirection === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    setPreview(sortedData);
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-6 flex items-end gap-4 rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex-1">
          <label
            htmlFor="dataset-name"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dataset Name
          </label>
          <input
            id="dataset-name"
            type="text"
            placeholder="Enter dataset name"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          onClick={fetchPreview}
          disabled={loading}
          className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {loading ? "Loading..." : "Load Data"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}

      {columns.length > 0 && preview.length > 0 ? (
        <div className="overflow-hidden rounded-lg border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column}</span>
                        {sortColumn === column && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {preview.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {columns.map((column) => {
                      const cellValue = row[column];
                      let formattedValue = cellValue ?? "-";

                      if (typeof cellValue === "object") {
                        formattedValue = JSON.stringify(cellValue);
                      }

                      return (
                        <td
                          key={`${rowIndex}-${column}`}
                          className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200"
                        >
                          {formattedValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
            Showing {preview.length} rows and {columns.length} columns
          </div>
        </div>
      ) : !loading && !error ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            Enter a dataset name and click &quot;Load Data&quot; to view the
            table
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default DatasetPreview;

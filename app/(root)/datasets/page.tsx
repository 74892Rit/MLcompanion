"use client";
import { useState } from "react";
import { Database, Upload, Info, Eye, List } from "lucide-react";
import DatasetList from "@/components/datasetmanagment/Availabledataset";
import DatasetInfo from "@/components/datasetmanagment/Datasetinfo";
import DatasetPreview from "@/components/datasetmanagment/Datasetpreview";
import UploadDataset from "@/components/datasetmanagment/Uploaddataset";

const DatasetsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  const tabs = [
    { id: "list", label: "Available Datasets", icon: List },
    { id: "upload", label: "Upload Dataset", icon: Upload },
    { id: "info", label: "Dataset Information", icon: Info },
    { id: "preview", label: "Dataset Preview", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 transition-colors dark:bg-gray-900">
      <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800">
        <div className="mb-6 flex items-center border-b border-gray-200 pb-4 transition-colors dark:border-gray-700">
          <Database className="mr-3 size-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-800 transition-colors dark:text-white">
            Dataset Management
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "info" && !selectedDataset) return;
                  setActiveTab(tab.id);
                }}
                disabled={tab.id === "info" && !selectedDataset}
                className={`flex items-center rounded-md px-4 py-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md dark:bg-blue-700"
                    : tab.id === "info" && !selectedDataset
                      ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <Icon className="mr-2 size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
          {activeTab === "list" && (
            <DatasetList
              onSelect={(dataset) => {
                setSelectedDataset(dataset);
                setActiveTab("info");
              }}
            />
          )}
          {activeTab === "upload" && <UploadDataset />}
          {activeTab === "info" && selectedDataset && (
            <DatasetInfo
              dataset={selectedDataset}
              onBack={() => setActiveTab("list")}
            />
          )}
          {activeTab === "preview" && selectedDataset && (
            <DatasetPreview dataset-name={selectedDataset} />
          )}
          {activeTab === "preview" && !selectedDataset && (
            <div className="flex h-64 flex-col items-center justify-center text-gray-500 transition-colors dark:text-gray-400">
              <Eye className="mb-2 size-12 text-gray-300 dark:text-gray-600" />
              <p className="text-lg">Please select a dataset first</p>
              <button
                onClick={() => setActiveTab("list")}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Go to datasets
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetsPage;

"use client";
import { useState } from "react";

const UploadDataset = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error("Upload failed");
      setMessage(`✅ Upload successful: ${result.message}`);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Upload Dataset</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mt-4"
      />
      <button
        onClick={handleUpload}
        className="mt-4 rounded bg-blue-500 p-2 text-white"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default UploadDataset;

// src/components/AudioUpload.jsx
import React, { useState } from "react";

function AudioUpload() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🎤 Upload an Audio File</h2>

      <input
        type="file"
        accept=".wav"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Upload & Predict"}
      </button>

      {prediction && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg shadow text-indigo-700 font-semibold">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
}

export default AudioUpload;

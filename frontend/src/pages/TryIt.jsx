import React, { useState, useRef } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const TryIt = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [spectrogram, setSpectrogram] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isExample, setIsExample] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setMessage("");
    setPrediction("");
    setConfidence(null);
    setSpectrogram(null);
    setIsExample(false);
    setAudioURL(URL.createObjectURL(uploadedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setMessage("⏳ Uploading and predicting...");
    setPrediction("");
    setConfidence(null);
    setSpectrogram(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { prediction, confidence, spectrogram } = response.data;

      setMessage("✅ Prediction complete.");
      setPrediction(prediction || "No prediction returned.");
      setConfidence(confidence || null);
      setSpectrogram(spectrogram || null);
    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Unknown error occurred";
      setMessage("❌ Error: " + errorMsg);
      setPrediction("");
      setConfidence(null);
      console.error("Prediction failed:", error);
    }
  };

  const handleTryExample = async () => {
    setMessage("⏳ Loading example and predicting...");
    setPrediction("");
    setConfidence(null);
    setSpectrogram(null);
    setIsExample(true);
    setFile(null);

    try {
      const response = await fetch("/samples/example.wav");
      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);
      setAudioURL(fileURL);

      const formData = new FormData();
      formData.append("file", new File([blob], "example.wav", { type: "audio/wav" }));

      const result = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { prediction, confidence, spectrogram } = result.data;

      setMessage("✅ Prediction complete (example audio).");
      setPrediction(prediction || "No prediction returned.");
      setConfidence(confidence || null);
      setSpectrogram(spectrogram || null);
    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Unknown error occurred";
      setMessage("❌ Error: " + errorMsg);
      console.error("Prediction failed:", error);
    }
  };

  const handleReset = () => {
    setFile(null);
    setMessage("");
    setPrediction("");
    setConfidence(null);
    setSpectrogram(null);
    setAudioURL(null);
    setIsExample(false);
    setShowToast(true);

    if (fileInputRef.current) {
      fileInputRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans relative">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">🧪 Try It Yourself</h1>

      <div className="bg-blue-50 border-l-4 border-blue-300 text-blue-800 p-4 mb-6 rounded-lg">
        <h2 className="font-semibold mb-2">👣 How it works</h2>
        <ul className="list-decimal list-inside text-sm space-y-1">
          <li>Upload a <code>.wav</code> file — like a dog bark, cough, or knock.</li>
          <li>The sound is turned into a spectrogram (a picture of the audio).</li>
          <li>A deep learning model analyzes it to recognize the pattern.</li>
          <li>You’ll see the predicted label, confidence, and the spectrogram.</li>
        </ul>
      </div>

      <div ref={fileInputRef} className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="file"
          accept=".wav"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          onClick={handleTryExample}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          ▶️ Try Example Audio
        </button>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
      >
        Upload & Predict
      </button>

      {message && (
        <div className="mt-4 text-gray-700">
          {message.startsWith("⏳") ? (
            <Spinner text="Analyzing your sound..." />
          ) : (
            <p>🔔 {message}</p>
          )}
        </div>
      )}

      {audioURL && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">🎧 Audio Preview</h2>
          <audio controls className="mt-2 w-full">
            <source src={audioURL} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          {isExample && (
            <p className="text-sm text-gray-500 italic mt-1">
              (This is a sample recording of <strong>rain</strong>.)
            </p>
          )}
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-indigo-700">🧠 AI Prediction</h2>
          <p className="mt-2 text-sm text-gray-600">
            Based on the sound you uploaded, the model thinks it's most likely a:
          </p>
          <p className="mt-2 text-2xl font-bold text-indigo-800">{prediction}</p>

          {confidence !== null && (
            <div className="mt-4">
              <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                Confidence: <strong>{confidence}%</strong>
                <div className="relative group">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full cursor-help">
                    ⓘ
                  </span>
                  <div className="absolute z-10 hidden group-hover:block bg-white text-gray-800 text-xs p-3 rounded-lg shadow-md w-64 top-6 left-0">
                    This score shows how confident the model is in its prediction,
                    based on patterns it learned during training. Higher % means more certainty.
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-500 h-3 rounded-full transition-all"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500">
            Want to understand how this works? Check the{" "}
            <a href="/learn" className="text-indigo-600 underline">Learn</a> page!
          </p>
        </div>
      )}

      {spectrogram && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">📊 Spectrogram</h3>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border mb-3">
            This image shows how sound frequencies (pitches) changed over time in your audio.
            <ul className="list-disc list-inside mt-2">
              <li><strong>Left → right</strong>: time passing</li>
              <li><strong>Bottom → top</strong>: low to high pitch</li>
              <li><strong>Brighter colors</strong>: louder sound at that frequency</li>
            </ul>
            This is the image the AI model used to make its prediction.
          </div>
          <img
            src={`data:image/png;base64,${spectrogram}`}
            alt="Spectrogram"
            className="rounded-xl border shadow"
          />
        </div>
      )}

      {(prediction || spectrogram || audioURL) && (
        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-300 transition"
          >
            🔄 Reset and try another audio
          </button>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition">
          ✅ Reset complete!
        </div>
      )}
    </div>
  );
};

export default TryIt;

// Explore.jsx
import React, { useState } from "react";
import Spinner from "../components/Spinner";

const Explore = () => {
  const [audioURL, setAudioURL] = useState(null);
  const [fileName, setFileName] = useState("");
  const [spectrogram, setSpectrogram] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setAudioURL(url);
    setSpectrogram(null);
    setWaveform(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSpectrogram(data.spectrogram);
      setWaveform(data.waveform);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTryExample = async () => {
    setFileName("example.wav");
    setAudioURL("/samples/example.wav");
    setSpectrogram(null);
    setWaveform(null);
    setLoading(true);

    try {
      const response = await fetch("/samples/example.wav");
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", new File([blob], "example.wav", { type: "audio/wav" }));

      const analyze = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await analyze.json();
      setSpectrogram(data.spectrogram);
      setWaveform(data.waveform);
    } catch (err) {
      console.error("Example load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">🔍 Explore Audio Visually</h1>
      <div className="bg-white p-6 shadow-xl rounded-2xl space-y-4">
        <p className="text-gray-700 text-base">
          Upload an audio file or try a sample to see how it's represented visually. You'll learn how sound can be understood by machines using waveforms and spectrograms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleTryExample}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            ▶️ Try Example Audio
          </button>
        </div>

        {audioURL && (
          <div className="mt-6 space-y-6">
            <audio controls className="w-full">
              <source src={audioURL} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <div className="text-sm text-gray-600">File: {fileName}</div>

            {loading && (
              <div className="text-center">
                <Spinner text="Analyzing example audio..." />
              </div>
            )}


            {waveform && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📈 Waveform</h3>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border mb-3">
                  The waveform shows how loud the sound is at each moment in time. Taller peaks mean louder parts, and dips mean quiet moments.
                  It's a one-dimensional view of sound used in many traditional audio tools.
                </div>
                <img
                  src={`data:image/png;base64,${waveform}`}
                  alt="Waveform"
                  className="rounded-lg border shadow"
                />
              </div>
            )}

            {spectrogram && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Spectrogram</h3>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border mb-3">
                  The spectrogram shows how sound frequencies (pitches) change over time.
                  <ul className="list-disc list-inside mt-2">
                    <li><strong>Left → right</strong>: time passing</li>
                    <li><strong>Bottom → top</strong>: low to high pitch</li>
                    <li><strong>Brighter colors</strong>: louder sound at that frequency</li>
                  </ul>
                  This is the visual format our model uses to classify sounds.
                </div>
                <img
                  src={`data:image/png;base64,${spectrogram}`}
                  alt="Spectrogram"
                  className="rounded-lg border shadow"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

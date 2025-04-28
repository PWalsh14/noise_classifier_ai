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
    <div className="max-w-4xl mx-auto px-4 py-12 transition-colors duration-300 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">
        🔍 Explore Audio Visually
      </h1>

      <div className="bg-white dark:bg-gray-900 p-6 shadow-xl rounded-2xl space-y-4 border border-gray-200 dark:border-gray-700">
        <p className="text-base text-gray-700 dark:text-gray-300">
          Upload an audio file or try a sample to see how it's represented visually.
          You'll learn how sound can be understood by machines using waveforms and spectrograms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="w-full text-sm text-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 dark:file:bg-gray-800 file:text-blue-700 dark:file:text-gray-100 hover:file:bg-blue-100 dark:hover:file:bg-gray-700"
          />
          <button
            onClick={handleTryExample}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
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
            <div className="text-sm text-gray-600 dark:text-gray-400">File: {fileName}</div>

            {loading && (
              <div className="text-center">
                <Spinner text="Analyzing example audio..." />
              </div>
            )}

            {waveform && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">📈 Waveform</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-3">
                  The waveform shows how loud the sound is at each moment in time.
                  Taller peaks mean louder parts, and dips mean quiet moments. It's a one-dimensional view of sound used in many traditional audio tools.
                </div>
                <img
                  src={`data:image/png;base64,${waveform}`}
                  alt="Waveform"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 shadow"
                />
              </div>
            )}

            {spectrogram && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Spectrogram</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-3">
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
                  className="rounded-lg border border-gray-300 dark:border-gray-600 shadow"
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

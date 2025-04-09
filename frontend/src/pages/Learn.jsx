import React, { useState } from "react";
import GlossaryTerm from "../components/GlossaryTerm";

const concepts = [
  {
    id: "spectrogram",
    title: "🔊 What is a Spectrogram?",
    content: (
      <>
        <p>
          A <GlossaryTerm term="spectrogram" /> is a visual representation of sound. It shows how frequencies change over time,
          with brighter parts representing louder sounds.
        </p>
        <p className="mt-2">
          We convert audio into spectrograms so we can use image-based deep learning models (
          <GlossaryTerm term="cnn" />s) to classify them.
        </p>
      </>
    ),
  },
  {
    id: "cnn",
    title: "🧠 What is a CNN?",
    content: (
      <>
        <p>
          A <GlossaryTerm term="cnn" /> is a neural network architecture that's especially good with images. It uses
          <GlossaryTerm term="filter" />s to detect visual features like edges or textures.
        </p>
        <p className="mt-2">
          In our case, the image is a spectrogram, and the CNN learns to recognize patterns that correspond to specific sounds.
        </p>
      </>
    ),
  },
  {
    id: "augmentation",
    title: "🎛️ What is Data Augmentation?",
    content: (
      <>
        <p>
          <GlossaryTerm term="augmentation" /> means making modified copies of existing audio to teach the model to be more flexible.
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
          <li><GlossaryTerm term="pitchshift" /></li>
          <li><GlossaryTerm term="noiseinjection" /></li>
          <li><GlossaryTerm term="timestretch" /></li>
        </ul>
      </>
    ),
  },
  {
    id: "training",
    title: "⚙️ What Does Training a Model Mean?",
    content: (
      <>
        <p>
          <GlossaryTerm term="training" /> is the process of teaching a model to make predictions by feeding it labeled examples.
        </p>
        <p className="mt-2">
          Over multiple <GlossaryTerm term="epoch" />s, the model learns patterns that help it make accurate predictions on new data.
        </p>
      </>
    ),
  },
];

const Learn = () => {
  const [expanded, setExpanded] = useState({});
  const [read, setRead] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRead = (id) => {
    setRead((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">📘 Learn AI Concepts</h1>
      <p className="text-gray-600 mb-6">
        Click a topic below to learn how your sound is transformed and analyzed using deep learning.
      </p>

      {concepts.map(({ id, title, content }) => (
        <div
          key={id}
          className={`mb-4 border rounded-xl shadow transition duration-300 ${
            expanded[id] ? "bg-indigo-50" : "bg-white"
          }`}
        >
          <div
            onClick={() => toggleExpand(id)}
            className="cursor-pointer p-4 flex justify-between items-center"
          >
            <h2 className="font-semibold text-indigo-700 text-lg">{title}</h2>
            <div className="flex items-center gap-3">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRead(id);
                }}
                className={`text-xs px-2 py-1 rounded-full ${
                  read[id]
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                } cursor-pointer`}
              >
                {read[id] ? "✓ Read" : "Mark as Read"}
              </span>
              <span className="text-xl">
                {expanded[id] ? "▾" : "▸"}
              </span>
            </div>
          </div>
          {expanded[id] && (
            <div className="px-4 pb-4 text-sm text-gray-800">{content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Learn;

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
          We convert audio into spectrograms so we can use image-based deep learning models like <GlossaryTerm term="cnn" />s to classify them.
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
          A <GlossaryTerm term="cnn" /> is a neural network architecture that's especially good with images. It uses <GlossaryTerm term="filter" />s to detect visual features like edges or textures.
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
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600 dark:text-gray-300">
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
  {
    id: "softmax",
    title: "🧮 What is Softmax?",
    content: (
      <>
        <p>
          <GlossaryTerm term="softmax" /> is a function that converts raw output numbers from the model into a probability distribution.
        </p>
        <p className="mt-2">
          It ensures all values are between 0 and 1 and that they add up to 1 — making it easier to interpret which class the model is most confident about.
        </p>
      </>
    ),
  },
  {
    id: "confidence",
    title: "📊 What is a Confidence Score?",
    content: (
      <>
        <p>
          A <GlossaryTerm term="confidence" /> score tells you how certain the model is about its prediction.
        </p>
        <p className="mt-2">
          It's based on the output of the <GlossaryTerm term="softmax" /> layer. A score closer to 100% means the model is more certain about that prediction.
        </p>
      </>
    ),
  },
  {
    id: "waveform",
    title: "📈 What is a Waveform?",
    content: (
      <>
        <p>
          A <GlossaryTerm term="waveform" /> is a basic visual representation of sound, showing how loud the audio is at each moment in time.
        </p>
        <p className="mt-2">
          It's useful for seeing where the volume rises and falls, but it doesn’t give insight into the frequencies involved — that’s why spectrograms are more useful for classification.
        </p>
      </>
    ),
  },
  {
    id: "preprocessing",
    title: "⚙️ What is Preprocessing?",
    content: (
      <>
        <p>
          <GlossaryTerm term="preprocessing" /> involves preparing raw audio data so it's in a format suitable for training a machine learning model.
        </p>
        <p className="mt-2">
          For this project, preprocessing includes steps like converting to mono, resampling, creating spectrograms, resizing, and normalizing.
        </p>
      </>
    ),
  },
  {
    id: "melscale",
    title: "🎵 What is the Mel Scale?",
    content: (
      <>
        <p>
          The <GlossaryTerm term="melscale" /> is a way of mapping audio frequencies based on how humans actually perceive sound.
        </p>
        <p className="mt-2">
          Lower frequencies are spaced more densely, which helps the model better capture important audio features in natural sounds.
        </p>
      </>
    ),
  },

  // ✨ NEW CARDS BELOW

  {
    id: "overfitting",
    title: "🔁 What is Overfitting?",
    content: (
      <>
        <p>
          <GlossaryTerm term="overfitting" /> happens when a model learns the training data too well — including its noise and quirks — and struggles to perform on new, unseen data.
        </p>
        <p className="mt-2">
          Techniques like <GlossaryTerm term="dropout" /> and <GlossaryTerm term="augmentation" /> help reduce overfitting by improving generalisation.
        </p>
      </>
    ),
  },
  {
    id: "classificationmodel",
    title: "🎯 What is a Classification Model?",
    content: (
      <>
        <p>
          A <GlossaryTerm term="classifier" /> is a model trained to assign input data into one of several predefined categories.
        </p>
        <p className="mt-2">
          In this app, the classifier predicts which environmental sound (e.g., <em>dog bark</em> or <em>rain</em>) matches the input audio.
        </p>
      </>
    ),
  },
  {
    id: "esc10",
    title: "🧪 What is the ESC-10 Dataset?",
    content: (
      <>
        <p>
          <GlossaryTerm term="esc10" /> is a small benchmark dataset containing 400 short environmental sound recordings from 10 classes.
        </p>
        <p className="mt-2">
          It’s a subset of the <GlossaryTerm term="esc50" /> dataset and is ideal for quick training experiments.
        </p>
      </>
    ),
  },
  {
    id: "normalisation",
    title: "🧮 What is Normalisation?",
    content: (
      <>
        <p>
          <GlossaryTerm term="normalisation" /> is the process of scaling input values to a consistent range, often between 0 and 1.
        </p>
        <p className="mt-2">
          This helps the model train more effectively and reduces bias towards larger input values.
        </p>
      </>
    ),
  },
  {
    id: "feature",
    title: "💡 What is a Feature?",
    content: (
      <>
        <p>
          A <GlossaryTerm term="feature" /> is an individual measurable property of the data. In spectrograms, these could be patterns of frequency over time.
        </p>
        <p className="mt-2">
          Models learn which features are useful for making accurate predictions during training.
        </p>
      </>
    ),
  },
  {
    id: "Model Architecture",
    title: "🧩 What is a Model Architecture?",
    content: (
      <>
        <p>
          <GlossaryTerm term="Model Architecture" /> refers to the layout of layers and operations that define how a model processes data.
        </p>
        <p className="mt-2">
          In your case, the architecture includes <GlossaryTerm term="convolution" /> layers, <GlossaryTerm term="pooling" />, <GlossaryTerm term="dense" />, and an output layer.
        </p>
      </>
    ),
  },
];


const Learn = () => {
  const [expanded, setExpanded] = useState({});
  const [read, setRead] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const newExpanded = { ...prev, [id]: !prev[id] };
      if (!read[id] && !prev[id]) {
        setRead((prevRead) => ({ ...prevRead, [id]: true }));
      }
      return newExpanded;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-white mb-6">📘 Learn AI Concepts</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Click a topic below to learn how your sound is transformed and analyzed using deep learning.
      </p>

      {concepts.map(({ id, title, content }) => (
        <div
          key={id}
          className={`mb-4 border rounded-xl shadow transition duration-300 ${
            expanded[id] ? "bg-indigo-50 dark:bg-indigo-900" : "bg-white dark:bg-gray-800"
          }`}
        >
          <div
            onClick={() => toggleExpand(id)}
            className="cursor-pointer p-4 flex justify-between items-center"
          >
            <h2 className="font-semibold text-indigo-700 dark:text-indigo-100 text-lg">{title}</h2>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  read[id]
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                }`}
              >
                {read[id] ? "✓ Read" : "Unread"}
              </span>
              <span className="text-xl dark:text-white">
                {expanded[id] ? "▾" : "▸"}
              </span>
            </div>
          </div>
          {expanded[id] && (
            <div className="px-4 pb-4 text-sm text-gray-800 dark:text-gray-200">
              {content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Learn;

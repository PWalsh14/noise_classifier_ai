import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-center">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        🔊 AI-Powered Environmental Sound Classifier
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Upload a sound. Watch AI turn it into a spectrogram. Get a prediction. Learn how it works.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <Link to="/try-it">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-indigo-700">
            🧪 Try It
          </button>
        </Link>
        <Link to="/learn">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-green-700">
            📘 Learn
          </button>
        </Link>
        <Link to="/explore">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-blue-700">
            🔍 Explore
          </button>
        </Link>
      </div>

      {/* What the app does */}
      <div className="bg-white shadow rounded-xl p-6 text-left max-w-3xl mx-auto mb-12 border">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">🔬 How does this app work?</h2>
        <p className="text-sm text-gray-700">
          This web app uses deep learning to classify short environmental sounds like barking, coughing, or knocking.
          It converts audio files into colorful spectrograms — images of sound — and feeds them into a trained
          convolutional neural network (<strong>CNN</strong>) to make predictions. It’s a fun, educational tool for
          exploring how machines interpret sound.
        </p>
      </div>

      {/* Footer - academic credit */}
      <div className="text-xs text-gray-500 mt-12 italic">
        Inspired by Chapter 12 of&nbsp;
        <a
          href="https://nostarch.com/download/PracticalDeepLearning2e_Chapter12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-600"
        >
          Practical Deep Learning for Coders, 2nd Edition
        </a>
        &nbsp;(Howard & Gugger, 2021)
      </div>
    </div>
  );
};

export default Home;

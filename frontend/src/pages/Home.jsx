import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-center transition-colors duration-300 text-gray-800 dark:text-gray-100">
      
      {/* Optional soft welcome intro */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        An interactive introduction to how AI understands and classifies sound
      </p>

      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
        🔊 AI-Powered Environmental Sound Classifier
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
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
        <Link to="/snap-game">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-purple-700">
            🧠 Match-Pairs Quiz
          </button>
        </Link>
      </div>

      {/* Onboarding steps for beginners */}
      <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl mt-6 mb-10 border border-indigo-200 dark:border-gray-600 text-left max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">👋 New to AI? Start here:</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>
            🧠 <strong>Learn</strong> the basics of AI and sound with the{" "}
            <Link to="/learn" className="text-indigo-600 dark:text-indigo-300 underline">Learn</Link> page.
          </li>
          <li>
            🔊 <strong>Try uploading</strong> a real sound on the{" "}
            <Link to="/try-it" className="text-indigo-600 dark:text-indigo-300 underline">Try It</Link> page.
          </li>
          <li>
            🎮 <strong>Test your knowledge</strong> in the fun{" "}
            <Link to="/snap-game" className="text-indigo-600 dark:text-indigo-300 underline">Match-Pairs Quiz</Link>.
          </li>
        </ol>
      </div>

      {/* How the app works */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 text-left max-w-3xl mx-auto mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">🔬 What does this app do?</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This app helps you explore how machines can understand sound. When you upload a short audio clip
          it turns the sound into a colorful image called a <strong>spectrogram</strong>. A trained AI model then looks at that image to guess what the sound is.
          <br className="mt-2" />
          You don’t need any coding experience — just curiosity! ✨
        </p>
      </div>

      {/* Footer - academic credit */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-12 italic">
        Inspired by Chapter 12 of{" "}
        <a
          href="https://nostarch.com/download/PracticalDeepLearning2e_Chapter12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Practical Deep Learning for Coders, 2nd Edition
        </a>{" "}
        (Howard & Gugger, 2021)
      </div>
    </div>
  );
};

export default Home;

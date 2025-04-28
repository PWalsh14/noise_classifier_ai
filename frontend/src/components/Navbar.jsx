import React from "react";
import { Link, useLocation } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"; // Optional if you're using heroicons

const Navbar = () => {
  const { pathname } = useLocation();
  const [isDark, toggleDarkMode] = useDarkMode();

  const linkClasses = (path) =>
    `px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
      pathname === path
        ? "text-blue-600 dark:text-white font-semibold"
        : "text-gray-600 dark:text-gray-300"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
          🔊 Noise Classifier
        </Link>

        <div className="flex items-center space-x-3">
          <Link to="/" className={linkClasses("/")}>Home</Link>
          <Link to="/learn" className={linkClasses("/learn")}>Learn</Link>
          <Link to="/explore" className={linkClasses("/explore")}>Explore</Link>
          <Link to="/try-it" className={linkClasses("/try-it")}>Try It</Link>
          <Link to="/glossary" className={linkClasses("/glossary")}>Glossary</Link>
          <Link to="/chatbot" className={linkClasses("/chatbot")}>Chatbot</Link>
          <Link to="/model-info" className={linkClasses("/model-info")}>Model Info</Link>
          <Link to="/snap-game" className={linkClasses("/snap-game")}>Match-Pairs Quiz</Link>

          {/* Theme toggle button */}
          <button
            onClick={toggleDarkMode}
            className="ml-2 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition"
            title="Toggle dark mode"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

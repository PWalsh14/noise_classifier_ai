import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const linkClasses = (path) =>
    `px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? "text-blue-600 font-semibold" : "text-gray-600"
    }`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          🔊 Noise Classifier
        </Link>
        <div className="space-x-2">
          <Link to="/" className={linkClasses("/")}>Home</Link>
          <Link to="/learn" className={linkClasses("/learn")}>Learn</Link>
          <Link to="/explore" className={linkClasses("/explore")}>Explore</Link>
          <Link to="/try-it" className={linkClasses("/try-it")}>Try It</Link>
          <Link to="/glossary" className={linkClasses("/glossary")}>Glossary</Link>
          <Link to="/chatbot" className={linkClasses("/chatbot")}>Chatbot</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
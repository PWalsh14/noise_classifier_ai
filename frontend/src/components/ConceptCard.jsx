import React from "react";

const ConceptCard = ({ title, children }) => (
  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm transition-colors duration-300">
    <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
      {title}
    </h2>
    <div className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
      {children}
    </div>
  </div>
);

export default ConceptCard;

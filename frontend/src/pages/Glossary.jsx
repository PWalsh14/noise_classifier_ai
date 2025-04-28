import React from "react";
import glossary from "../data/glossaryData";

const Glossary = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto transition-colors duration-300 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">📚 Glossary</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        A beginner-friendly list of key AI and audio terms explained. Click on a term to expand the definition.
      </p>

      <ul className="space-y-4">
        {glossary.map(({ key, display, definition }) => (
          <li
            key={key}
            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            <details>
              <summary className="cursor-pointer text-indigo-700 dark:text-indigo-300 font-semibold">
                {display}
              </summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {definition}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Glossary;

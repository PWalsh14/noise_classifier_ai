import React from "react";
import glossary from "../data/glossaryData";

const Glossary = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-indigo-700">📚 Glossary</h1>
      <p className="text-gray-700 mb-6">
        A beginner-friendly list of key AI and audio terms explained. Click on a term to expand the definition.
      </p>

      <ul className="space-y-4">
        {glossary.map(({ key, display, definition }) => (
          <li key={key} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <details>
              <summary className="cursor-pointer text-indigo-700 font-semibold">
                {display}
              </summary>
              <p className="mt-2 text-gray-600 text-sm">{definition}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Glossary;

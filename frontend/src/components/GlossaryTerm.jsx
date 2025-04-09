// GlossaryTerm.jsx
import React, { useState } from "react";
import glossary from "../data/glossaryData"; // You will create this file

const GlossaryTerm = ({ term }) => {
  const [show, setShow] = useState(false);
  const key = term.toLowerCase().replace(/\s+/g, "");
  const match = glossary.find((item) => item.key === key);

  return (
    <span
      className="relative inline-block cursor-help text-indigo-600 font-semibold"
      onClick={() => setShow(!show)}
      title="Click to learn more"
    >
      {term}
      {show && match && (
        <span className="absolute z-50 w-64 p-3 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-lg left-0">
          <strong>{match.display}</strong>: {match.definition}
        </span>
      )}
    </span>
  );
};

export default GlossaryTerm;

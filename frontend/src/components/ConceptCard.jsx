import React from "react";

const ConceptCard = ({ title, children }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
    <h2 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h2>
    <div className="text-gray-700 text-base leading-relaxed">{children}</div>
  </div>
);

export default ConceptCard;

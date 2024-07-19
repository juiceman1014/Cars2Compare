import React, { useState } from "react";

const Dropdown = ({ options }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm border-[2px] border-black rounded-md px-2 py-1"
      >
        Options
      </button>
      {isExpanded && (
        <div className="absolute mt-1 w-32 bg-white border-[2px] border-black rounded-md shadow-lg z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-2 py-1 hover:bg-gray-300 border-b-[1px] border-black last:border-0"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

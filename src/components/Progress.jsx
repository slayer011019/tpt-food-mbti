import React from "react";

export default function Progress({ value = 0 }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-2 bg-black rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

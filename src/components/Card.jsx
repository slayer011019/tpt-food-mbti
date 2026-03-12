import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`p-4 sm:p-6 bg-white border border-borderGray rounded-card shadow-softCard ${className}`.trim()}
    >
      {children}
    </div>
  );
}

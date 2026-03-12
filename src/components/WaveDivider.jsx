import React from "react";

export default function WaveDivider({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`block w-full h-10 sm:h-12 ${className}`.trim()}
      aria-hidden="true"
    >
      <path
        d="M0,64 C180,108 360,108 540,78 C720,48 900,12 1200,40 L1200,120 L0,120 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

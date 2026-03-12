import React from "react";

export default function Progress({
  value = 0,
  label = "",
  valueLabel,
  showHeader = false,
  className = "",
  trackClassName = "",
  fillClassName = "",
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const resolvedValueLabel =
    valueLabel !== undefined ? valueLabel : `${Math.round(clamped)}%`;

  return (
    <div className={`w-full ${className}`.trim()}>
      {showHeader ? (
        <div className="mb-2 flex items-center justify-between text-xs text-textGray">
          <span>{label}</span>
          <span>{resolvedValueLabel}</span>
        </div>
      ) : null}

      <div
        className={`w-full h-2.5 bg-borderGray/60 rounded-pill overflow-hidden ${trackClassName}`.trim()}
      >
        <div
          className={`h-full bg-gradient-to-r from-brand-start to-brand-end rounded-pill transition-all duration-300 ${fillClassName}`.trim()}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`p-4 sm:p-6 bg-gray-100 border rounded ${className}`.trim()}>
      {children}
    </div>
  );
}



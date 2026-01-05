import React from "react";

const base =
  "inline-flex items-center justify-center rounded transition font-semibold";

const variants = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
};

const sizes = {
  md: "py-3 px-6 text-base",
  sm: "py-2 px-4 text-sm",
  lg: "py-3.5 px-7 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const cls =
    `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

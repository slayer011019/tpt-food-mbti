import React from "react";

const base =
  "inline-flex items-center justify-center rounded-button transition font-semibold";

const variants = {
  primaryGradient:
    "bg-gradient-to-r from-brand-start to-brand-end text-white shadow-softCard hover:opacity-95",
  solidGreen: "bg-deepGreen text-white hover:opacity-95",
  outline: "bg-white text-textGray border border-borderGray hover:bg-warmBg",
  // Backward-compatible aliases
  primary:
    "bg-gradient-to-r from-brand-start to-brand-end text-white shadow-softCard hover:opacity-95",
  secondary: "bg-white text-textGray border border-borderGray hover:bg-warmBg",
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

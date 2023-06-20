"use client";

import React from "react";

interface Props {
  children?: React.ReactNode;
  iconEl?: React.ReactNode;
  variant?: "default" | "outline";
  color?: "default" | "error";
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef(function Button(props: Props, innerRef) {
  const {
    children,
    iconEl,
    variant = "default",
    onClick,
    color = "default",
    disabled = false,
    type = "button",
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative z-0 flex flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md ${
        disabled
          ? "bg-gray-300"
          : color === "error"
          ? "border border-red-700"
          : variant === "default"
          ? "bg-theme-green-main"
          : "border border-theme-green-main bg-white"
      } px-3 py-1 text-white ${
        disabled ? "cursor-not-allowed" : "shadow hover:shadow-md"
      } `}
    >
      <div className="absolute z-10 h-full w-full transition-all duration-200 group-hover:bg-gray-900/10 group-active:bg-gray-900/30" />
      {iconEl}
      <span
        className={`body1 relative z-20 ${
          color === "error"
            ? "text-red-700"
            : variant === "default"
            ? ""
            : "text-theme-green-main"
        }`}
      >
        {children}
      </span>
    </button>
  );
});

export default Button;

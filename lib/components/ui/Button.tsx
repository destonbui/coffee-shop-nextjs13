import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  children?: React.ReactNode;
  iconEl?: React.ReactElement;
  variant?: "default" | "outline";
  color?: "default" | "error";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef(function Button(props: Props, innerRef) {
  const {
    children,
    iconEl,
    variant = "default",
    onClick,
    color = "default",
  } = props;
  return (
    <button
      onClick={onClick}
      className={`group relative z-0 flex flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md ${
        color === "error"
          ? "border border-red-700"
          : variant === "default"
          ? "bg-theme-green-main"
          : "border border-theme-green-main bg-white"
      } px-3 py-1 text-white shadow hover:shadow-md`}
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

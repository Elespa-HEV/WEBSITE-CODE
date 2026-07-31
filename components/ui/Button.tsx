"use client";

import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "text-link" | "icon";
  children: React.ReactNode;
  icon?: "arrow-right" | "play";
};

export function Button({
  variant = "primary",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-[var(--ease-standard)] cursor-pointer";
  
  const variants = {
    primary: "bg-[var(--accent-yellow)] text-black rounded-full px-6 py-3 hover:bg-[#E0A800] hover:scale-[1.03]",
    outline: "border border-white/20 text-white rounded-full px-6 py-3 hover:border-white/50 hover:bg-white/5",
    "text-link": "text-[var(--accent-yellow)] hover:text-[#E0A800] p-0 group",
    icon: "bg-transparent text-white p-2 rounded-full border border-transparent hover:border-white/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon === "arrow-right" && (
        <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${variant === "primary" ? "group-hover:translate-x-1" : ""} ${variant === "text-link" ? "group-hover:translate-x-1" : ""}`} />
      )}
      {icon === "play" && (
        <PlayCircle className="w-4 h-4 ml-2" />
      )}
    </button>
  );
}

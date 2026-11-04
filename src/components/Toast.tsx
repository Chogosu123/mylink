"use client";

import React from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200 animate-tds-fade-in">
      <div className="bg-[#191F28] text-white px-5 py-3 rounded-[14px] tds-shadow-toast flex items-center gap-2.5 text-[15px] font-medium">
        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#20C997] text-white text-[11px] font-bold">
          ✓
        </span>
        <span className="tracking-tight">{message}</span>
      </div>
    </div>
  );
}

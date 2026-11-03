"use client";

import React from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-fade-in-up">
      <div className="bg-zinc-900/90 dark:bg-zinc-100/95 backdrop-blur-xl text-zinc-100 dark:text-zinc-900 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-sm font-medium border border-white/10 dark:border-black/5 ring-1 ring-black/10">
        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 text-xs font-bold">
          ✓
        </span>
        <span className="tracking-tight">{message}</span>
      </div>
    </div>
  );
}

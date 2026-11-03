"use client";

import React, { useState } from "react";
import { LinkItem } from "@/types/link";

interface LinkCardProps {
  link: LinkItem;
  onCopy?: (url: string) => void;
}

export default function LinkCard({ link, onCopy }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCopy) {
      onCopy(link.url);
    } else {
      navigator.clipboard.writeText(link.url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-white/75 dark:bg-zinc-900/75 backdrop-blur-md border border-zinc-200/70 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
    >
      {/* 마우스 호버 시 살짝 비추는 그라데이션 광선 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.04] to-indigo-500/[0.08] dark:from-blue-400/0 dark:via-blue-400/[0.06] dark:to-indigo-400/[0.12] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* 왼쪽 아이콘 및 타이틀/설명 */}
      <div className="flex items-center gap-3.5 min-w-0 z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl bg-gradient-to-br from-zinc-100 to-zinc-200/70 dark:from-zinc-800 dark:to-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/50 shadow-inner group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
          {link.icon || "🔗"}
        </div>
        <div className="text-left min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {link.title}
            </span>
            {link.badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xs">
                {link.badge}
              </span>
            )}
          </div>
          {link.description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
              {link.description}
            </p>
          )}
        </div>
      </div>

      {/* 오른쪽 액션 버튼 영역 */}
      <div className="flex items-center gap-1.5 flex-shrink-0 z-10">
        <button
          onClick={handleCopy}
          type="button"
          title={copied ? "복사 완료!" : "링크 주소 복사"}
          aria-label="링크 복사"
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all hover:scale-110 active:scale-95"
        >
          {copied ? (
            <svg
              className="w-4 h-4 text-emerald-500 animate-scale"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>

        {/* 바로가기 화살표 아이콘 */}
        <div className="p-2 rounded-xl text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          <svg
            className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

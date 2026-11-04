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
      className="group flex items-center justify-between w-full p-4 rounded-[16px] bg-white hover:bg-[#F9FAFB] active:bg-[#F2F4F6] transition-colors duration-150 border border-[#E5E8EB] tds-shadow-1 gap-3.5"
    >
      {/* 왼쪽 아바타 / 아이콘 (44px) */}
      <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 text-xl bg-[#E8F3FF] text-[#3182F6]">
        {link.icon || "🔗"}
      </div>

      {/* 텍스트 영역 (title + description 말줄임표 처리) */}
      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-[#191F28] text-[15px] sm:text-[16px] leading-tight truncate">
            {link.title}
          </span>
          {link.badge && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F3FF] text-[#3182F6] leading-none">
              {link.badge}
            </span>
          )}
        </div>
        {link.description && (
          <p className="text-[13px] text-[#8B95A1] mt-0.5 truncate leading-normal">
            {link.description}
          </p>
        )}
      </div>

      {/* 오른쪽 액션 영역 (복사 버튼 + chevron) */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={handleCopy}
          type="button"
          title={copied ? "복사되었어요" : "링크 복사"}
          aria-label="링크 복사"
          className={`px-2.5 py-1.5 rounded-full text-[12px] font-medium transition-all ${
            copied
              ? "bg-[#E8F3FF] text-[#3182F6]"
              : "text-[#8B95A1] hover:text-[#333D4B] hover:bg-[#F2F4F6]"
          }`}
        >
          {copied ? "복사됨" : "복사"}
        </button>

        {/* Toss 스타일 쉐브론 화살표 */}
        <div className="p-1 text-[#B0B8C1] group-hover:text-[#6B7684] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

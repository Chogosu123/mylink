"use client";

import React from "react";
import { LinkItem } from "@/types/link";
import { Trash2 } from "lucide-react";

interface LinkCardProps {
  link: LinkItem;
  onCopy?: (url: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * 2번째 사진 기반 링크 아이콘 렌더링
 */
function renderLinkIcon(title: string, customIcon?: string) {
  const lower = title.toLowerCase().trim();

  // 1. Instagram
  if (lower.includes("instagram") || lower.includes("인스타")) {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-xs">
        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth={2.5} />
        </svg>
      </div>
    );
  }

  // 2. YouTube
  if (lower.includes("youtube") || lower.includes("유튜브")) {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FF0000] text-white shadow-xs">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
    );
  }

  // 3. Blog (Velog Green V)
  if (lower.includes("blog") || lower.includes("블로그") || lower.includes("velog")) {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#20C997] text-white font-bold text-sm shadow-xs">
        v
      </div>
    );
  }

  // 4. GitHub
  if (lower.includes("github") || lower.includes("깃허브")) {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#191F28] text-white shadow-xs">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </div>
    );
  }

  // 5. 사용자가 직접 지정한 이모지
  if (customIcon && customIcon !== "🔗") {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-[#F2F4F6]">
        {customIcon}
      </div>
    );
  }

  // 6. 기본 지구본 (Portfolio / Web)
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F2F4F6] text-[#3182F6] border border-[#E5E8EB]">
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" x2="22" y1="12" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    </div>
  );
}

export default function LinkCard({ link, onDelete }: LinkCardProps) {
  return (
    <div className="relative w-full h-[60px] bg-white rounded-xl border border-[#E5E8EB] hover:border-[#191F28]/30 hover:shadow-xs transition-all flex items-center px-4 group">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center relative"
      >
        {/* 좌측 아이콘 (사진 2와 동일한 좌측 정렬) */}
        <div className="absolute left-0 flex items-center justify-center">
          {renderLinkIcon(link.title, link.icon)}
        </div>

        {/* 중앙 정렬 타이틀 (사진 2의 중앙 배치) */}
        <span className="font-medium text-[15px] sm:text-[16px] text-[#191F28] tracking-tight group-hover:text-[#3182F6] transition-colors">
          {link.title}
        </span>
      </a>

      {/* 우측 삭제 버튼 (호버 시 표시) */}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(link.id);
          }}
          className="absolute right-3 p-1.5 rounded-full text-transparent group-hover:text-[#8B95A1] hover:!text-[#F04452] hover:bg-[#FEEBED] transition-colors cursor-pointer"
          title="링크 삭제"
          aria-label="링크 삭제"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

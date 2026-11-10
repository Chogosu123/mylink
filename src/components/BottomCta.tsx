"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface BottomCtaProps {
  onShare: () => void;
  onCopyEmail: () => void;
}

export default function BottomCta({ onShare, onCopyEmail }: BottomCtaProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
      {/* 위쪽 TDS 보호 그라디언트 (스크롤 콘텐츠 보호) */}
      <div className="w-full h-6 tds-bottom-gradient pointer-events-none" />

      {/* 하단 고정 액션 버튼 그룹 */}
      <div className="w-full bg-[#F2F4F6] pb-5 px-5 flex justify-center pointer-events-auto">
        <div className="w-full max-w-[480px] flex flex-col gap-2.5">
          <Button
            variant="primary"
            size="l"
            className="w-full shadow-sm rounded-2xl h-[52px] text-[16px] font-bold flex items-center justify-center gap-1"
            onClick={onShare}
          >
            <span>프로필 링크 공유하기</span>
            <span className="text-[17px] font-normal">↗</span>
          </Button>

          <Button
            variant="secondary"
            size="l"
            className="w-full rounded-2xl h-[52px] text-[16px] font-semibold text-[#191F28] bg-white hover:bg-[#F9FAFB] border border-[#E5E8EB]"
            onClick={onCopyEmail}
          >
            이메일 복사
          </Button>
        </div>
      </div>
    </div>
  );
}

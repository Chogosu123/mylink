"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProfileHeaderProps {
  status?: string;
  onOpenQr: () => void;
  onShare: () => void;
  onOpenAdd?: () => void;
}

export default function ProfileHeader({
  status,
  onOpenQr,
  onShare,
  onOpenAdd,
}: ProfileHeaderProps) {
  return (
    <header className="w-full h-14 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[14px] font-semibold text-muted-foreground">
          {status || "온라인"}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {onOpenAdd && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenAdd}
            className="p-2 rounded-full h-9 w-9 text-muted-foreground hover:text-[#3182F6] hover:bg-[#E8F3FF]"
            title="새 링크 추가"
            aria-label="새 링크 추가"
          >
            <Plus className="w-5 h-5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenQr}
          className="p-2 rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
          title="QR 코드 보기"
          aria-label="QR 코드"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="p-2 rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
          title="공유하기"
          aria-label="공유"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </Button>
      </div>
    </header>
  );
}

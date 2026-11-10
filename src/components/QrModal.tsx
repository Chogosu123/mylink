"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export default function QrModal({ isOpen, onClose, url }: QrModalProps) {
  if (!isOpen) return null;

  const targetUrl = url || (typeof window !== "undefined" ? window.location.href : "https://mylink.com");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-xs shadow-2xl rounded-[20px] border border-[#E5E8EB]"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <h2 className="text-[18px] font-bold text-[#191F28] mb-1">
            프로필 QR 코드
          </h2>
          <p className="text-[14px] text-[#6B7684] mb-4">
            카메라로 스캔하면 바로 연결돼요
          </p>

          <div className="w-44 h-44 rounded-xl border border-[#E5E8EB] bg-white flex items-center justify-center p-2 mb-5">
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(targetUrl)}`}
              alt="프로필 QR 코드"
              width={160}
              height={160}
              unoptimized
            />
          </div>

          <Button
            variant="secondary"
            size="l"
            onClick={onClose}
            className="w-full"
          >
            닫기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

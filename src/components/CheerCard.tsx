"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CheerCardProps {
  name: string;
  likes: number;
  onLike: () => void;
}

export default function CheerCard({ name, likes, onLike }: CheerCardProps) {
  return (
    <Card className="w-full mb-8">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-semibold text-[#191F28]">
            {name} 님에게 응원 남기기
          </p>
          <p className="text-[13px] text-[#6B7684] mt-0.5">
            지금까지 <span className="font-semibold text-[#3182F6] tabular-nums">{likes}명</span>이 응원했어요
          </p>
        </div>

        <Button
          onClick={onLike}
          variant="brandWeak"
          size="s"
          className="rounded-full gap-1.5"
        >
          <span>💙</span>
          <span>응원하기</span>
        </Button>
      </CardContent>
    </Card>
  );
}

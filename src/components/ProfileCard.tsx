"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProfileData } from "@/types/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  profile: ProfileData;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <Card className="w-full mb-4 text-center rounded-[24px] border border-[#E5E8EB] shadow-xs">
      <CardContent className="pt-7 pb-6 px-6 flex flex-col items-center">
        {/* 원형 아바타 (20대 공대생 일러스트) */}
        <div className="relative w-[88px] h-[88px] rounded-full overflow-hidden mb-3.5 border-2 border-white ring-2 ring-[#E5E8EB] bg-[#F2F4F6] flex items-center justify-center shrink-0 shadow-xs">
          {!avatarError ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/avatar.png`}
              alt={profile.name}
              fill
              sizes="88px"
              className="object-cover"
              priority
              onError={() => setAvatarError(true)}
            />
          ) : (
            <span className="text-2xl font-bold text-[#3182F6]">
              {profile.name[0]}
            </span>
          )}
        </div>

        {/* 이름 */}
        <h1 className="text-[22px] font-bold text-[#191F28] leading-[1.3] tracking-tight">
          {profile.name}
        </h1>

        {/* 부제목/타이틀 */}
        {profile.title && (
          <p className="text-[15px] font-medium text-[#3182F6] mt-1">
            {profile.title}
          </p>
        )}

        {/* 뱃지 태그 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
          <Badge variant="subtle">한양대학교</Badge>
          <Badge variant="brand">바이브 코딩</Badge>
          <Badge variant="subtle">Next.js</Badge>
        </div>

        {/* 하단 소셜 링크 아이콘 바 */}
        {profile.socials && (
          <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#F2F4F6] w-full">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-[#6B7684] hover:text-[#191F28] hover:bg-[#F2F4F6] transition-colors"
                title="GitHub"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            )}
            {profile.socials.blog && (
              <a
                href={profile.socials.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-[#6B7684] hover:text-[#191F28] hover:bg-[#F2F4F6] transition-colors"
                title="블로그"
                aria-label="블로그"
              >
                <svg className="w-5 h-5 fill-none stroke-currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </a>
            )}
            {profile.socials.instagram && (
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-[#6B7684] hover:text-[#191F28] hover:bg-[#F2F4F6] transition-colors"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-none stroke-currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth={1.8} />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth={1.8} />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth={2.2} />
                </svg>
              </a>
            )}
            {profile.socials.email && (
              <a
                href={profile.socials.email}
                className="p-2.5 rounded-full text-[#6B7684] hover:text-[#191F28] hover:bg-[#F2F4F6] transition-colors"
                title="이메일"
                aria-label="이메일"
              >
                <svg className="w-5 h-5 fill-none stroke-currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

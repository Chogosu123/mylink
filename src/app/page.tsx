"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProfileData } from "@/types/link";
import LinkCard from "@/components/LinkCard";
import Toast from "@/components/Toast";

const INITIAL_PROFILE: ProfileData = {
  name: "이주성",
  title: "바이브 코딩으로 아이디어를 만들어요",
  bio: "안녕하세요, 이주성이에요. 생각을 코드로 빠르게 실현하는 바이브 코딩을 즐겨요. 새로운 기술과 창의적인 프로젝트에 늘 호기심이 많아요.",
  status: "새로운 프로젝트 구상 중이에요",
  avatarUrl: "/avatar.jpg",
  socials: {
    github: "https://github.com/Chogosu123",
    blog: "https://velog.io",
    instagram: "https://instagram.com",
    email: "mailto:sooo849667@gmail.com",
  },
  links: [
    {
      id: "1",
      title: "GitHub 저장소",
      url: "https://github.com/Chogosu123",
      description: "학습한 코드와 프로젝트 소스코드 모음",
      icon: "💻",
      category: "project",
      badge: "대표",
    },
    {
      id: "2",
      title: "기술 블로그",
      url: "https://velog.io",
      description: "바이브 코딩 배운 내용과 개발 기록",
      icon: "📝",
      category: "blog",
      badge: "주간",
    },
    {
      id: "3",
      title: "포트폴리오",
      url: "https://notion.so",
      description: "그동안 진행한 활동과 프로젝트 정리",
      icon: "📑",
      category: "project",
    },
    {
      id: "4",
      title: "인스타그램",
      url: "https://instagram.com",
      description: "일상과 소소한 순간들을 공유해요",
      icon: "📸",
      category: "contact",
    },
    {
      id: "5",
      title: "이메일 문의",
      url: "mailto:sooo849667@gmail.com",
      description: "협업이나 궁금한 점은 언제든 환영해요",
      icon: "✉️",
      category: "contact",
      badge: "열림",
    },
  ],
};

type Category = "all" | "project" | "blog" | "contact";

export default function Home() {
  const [profile] = useState<ProfileData>(INITIAL_PROFILE);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [likes, setLikes] = useState<number>(36);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLikes = localStorage.getItem("profile_likes_tds");
      if (savedLikes) {
        setLikes(parseInt(savedLikes, 10));
      }
    }
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    triggerToast("링크를 복사했어요");
  };

  const handleShareProfile = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name}님의 프로필`,
          text: profile.bio,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // 취소 시 무시
      }
    }

    navigator.clipboard.writeText(shareUrl);
    triggerToast("프로필 주소를 복사했어요");
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem("profile_likes_tds", newLikes.toString());
    triggerToast("응원을 보냈어요!");
  };

  const filteredLinks = profile.links.filter((link) => {
    if (selectedCategory === "all") return true;
    return link.category === selectedCategory;
  });

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between bg-[#F2F4F6] text-[#191F28] pb-28">
      
      {/* 📱 모바일 컨테이너 (최대 480px, TDS Mobile 권장 규격) */}
      <div className="w-full max-w-[480px] mx-auto px-5 pt-4 flex flex-col items-center">
        
        {/* 상단 앱바 (TopAppBar - 56pt) */}
        <header className="w-full h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3182F6]" />
            <span className="text-[15px] font-semibold text-[#4E5968]">
              {profile.status}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowQrModal(true)}
              type="button"
              className="p-2 rounded-full text-[#6B7684] hover:bg-[#E5E8EB] active:scale-95 transition-all"
              title="QR 코드 보기"
              aria-label="QR 코드"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>
            <button
              onClick={handleShareProfile}
              type="button"
              className="p-2 rounded-full text-[#6B7684] hover:bg-[#E5E8EB] active:scale-95 transition-all"
              title="공유하기"
              aria-label="공유"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </header>

        {/* 🪪 프로필 헤더 카드 (TDS radius-3xl 24px + White Surface) */}
        <section className="w-full bg-white rounded-[24px] p-6 mb-4 border border-[#E5E8EB] tds-shadow-1 flex flex-col items-center text-center">
          
          {/* 아바타 (84px 원형 + 미세 hairline) */}
          <div className="relative w-[84px] h-[84px] rounded-full overflow-hidden mb-4 border border-[#E5E8EB] bg-[#F2F4F6] flex items-center justify-center flex-shrink-0">
            {!avatarError ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
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

          {/* 이름 & 타이틀 */}
          <h1 className="text-[24px] font-bold text-[#191F28] leading-tight">
            {profile.name}
          </h1>
          {profile.title && (
            <p className="text-[14px] font-medium text-[#3182F6] mt-1">
              {profile.title}
            </p>
          )}

          {/* TDS 인라인 뱃지 태그 (radius-full) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 mb-3.5">
            <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#F2F4F6] text-[#4E5968]">
              한양대학교
            </span>
            <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#E8F3FF] text-[#3182F6]">
              바이브 코딩
            </span>
            <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#F2F4F6] text-[#4E5968]">
              Next.js
            </span>
          </div>

          {/* 자기소개 (body-2: 15px / 1.5 line-height) */}
          <p className="text-[15px] font-normal text-[#4E5968] leading-[1.5] max-w-sm">
            {profile.bio}
          </p>

          {/* 소셜 링크 아이콘 바 */}
          {profile.socials && (
            <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#F2F4F6] w-full">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-[#6B7684] hover:bg-[#F2F4F6] active:bg-[#E5E8EB] transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {profile.socials.blog && (
                <a
                  href={profile.socials.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-[#6B7684] hover:bg-[#F2F4F6] active:bg-[#E5E8EB] transition-colors"
                  title="블로그"
                  aria-label="블로그"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </a>
              )}
              {profile.socials.instagram && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-[#6B7684] hover:bg-[#F2F4F6] active:bg-[#E5E8EB] transition-colors"
                  title="인스타그램"
                  aria-label="인스타그램"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {profile.socials.email && (
                <a
                  href={profile.socials.email}
                  className="p-2.5 rounded-full text-[#6B7684] hover:bg-[#F2F4F6] active:bg-[#E5E8EB] transition-colors"
                  title="이메일"
                  aria-label="이메일"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </section>

        {/* 🗂️ TDS Segmented Control (분절형 탭 선택기) */}
        <div className="w-full flex items-center justify-between p-1 mb-3 rounded-[14px] bg-[#E5E8EB]">
          {[
            { id: "all", label: "전체" },
            { id: "project", label: "프로젝트" },
            { id: "blog", label: "블로그" },
            { id: "contact", label: "연락처" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as Category)}
              className={`flex-1 py-2 text-[14px] font-semibold rounded-[11px] transition-all duration-150 ${
                selectedCategory === tab.id
                  ? "bg-white text-[#191F28] tds-shadow-1"
                  : "text-[#6B7684] hover:text-[#191F28]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔗 링크 리스트 (ListRows) */}
        <section className="w-full flex flex-col gap-2.5 mb-5">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} onCopy={handleCopyLink} />
          ))}
        </section>

        {/* ❤️ 응원하기 서브 카드 (해요체 카피) */}
        <section className="w-full bg-white rounded-[20px] p-4 border border-[#E5E8EB] tds-shadow-1 flex items-center justify-between mb-8">
          <div>
            <p className="text-[15px] font-semibold text-[#191F28]">
              이주성 님에게 응원 남기기
            </p>
            <p className="text-[13px] text-[#8B95A1] mt-0.5">
              지금까지 <span className="font-semibold text-[#3182F6] tabular-nums">{likes}명</span>이 응원했어요
            </p>
          </div>

          <button
            onClick={handleLike}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E8F3FF] hover:bg-[#D5E8FD] active:scale-95 text-[#3182F6] text-[13px] font-semibold transition-all"
          >
            <span>💙</span>
            <span>응원하기</span>
          </button>
        </section>

        {/* 푸터 */}
        <footer className="text-center text-[12px] text-[#8B95A1] pb-6 flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-[11px] text-[#B0B8C1]">Toss Design System (TDS) 기반으로 만들었어요</p>
        </footer>
      </div>

      {/* 🚀 화면 최하단 고정 Primary CTA (TDS BottomCTA)
          "화면당 유일한 Blue-500 채움 버튼, 상단 보호 그라디언트 적용"
      */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
        <div className="w-full h-8 tds-bottom-gradient" />
        <div className="w-full bg-[#F2F4F6] pb-5 px-5 flex justify-center pointer-events-auto">
          <div className="w-full max-w-[480px]">
            <a
              href="mailto:sooo849667@gmail.com"
              className="w-full h-14 rounded-[16px] bg-[#3182F6] hover:bg-[#1B64DA] active:bg-[#1553B8] text-white font-bold text-[17px] flex items-center justify-center tds-shadow-1 transition-colors duration-150"
            >
              이메일로 커피챗 제안하기
            </a>
          </div>
        </div>
      </div>

      {/* 📱 QR 코드 바텀 모달 (TDS Dialog / Sheet 스타일) */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-tds-fade-in"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-xs bg-white rounded-[24px] p-6 tds-shadow-toast border border-[#E5E8EB] text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F3FF] text-[#3182F6] flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="font-bold text-[18px] text-[#191F28] mb-1">
              QR 코드로 접속하기
            </h3>
            <p className="text-[13px] text-[#8B95A1] mb-4">
              카메라로 스캔하면 바로 열려요
            </p>

            <div className="p-3 bg-white rounded-[16px] border border-[#E5E8EB] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : "https://localhost:3000"
                )}`}
                alt="Profile QR Code"
                className="w-40 h-40"
              />
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full h-12 rounded-[14px] bg-[#F2F4F6] text-[#4E5968] font-semibold text-[15px] hover:bg-[#E5E8EB] active:bg-[#D1D6DB] transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 🔔 TDS 토스트 알림 */}
      <Toast message={toastMessage} isVisible={showToast} />
    </main>
  );
}

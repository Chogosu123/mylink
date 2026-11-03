"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProfileData, LinkItem } from "@/types/link";
import LinkCard from "@/components/LinkCard";
import Toast from "@/components/Toast";

const INITIAL_PROFILE: ProfileData = {
  name: "이주성",
  title: "Frontend & AI Vibe Coder",
  bio: "안녕하세요! 생각을 코드로 빠르게 실현하는 바이브 코딩을 즐기는 한양대학교 학생 이주성입니다. 새로운 기술과 창의적인 프로젝트에 늘 호기심이 많습니다.",
  status: "새로운 프로젝트 구상 중 ✨",
  avatarUrl: "/avatar.jpg",
  socials: {
    github: "https://github.com",
    blog: "https://velog.io",
    instagram: "https://instagram.com",
    email: "mailto:contact@example.com",
  },
  links: [
    {
      id: "1",
      title: "GitHub 저장소",
      url: "https://github.com",
      description: "학습한 코드와 최신 프로젝트 소스코드",
      icon: "💻",
      category: "project",
      badge: "Main",
    },
    {
      id: "2",
      title: "기술 블로그 (Velog)",
      url: "https://velog.io",
      description: "바이브 코딩 배운 내용과 개발 시행착오 기록",
      icon: "📝",
      category: "blog",
      badge: "Weekly",
    },
    {
      id: "3",
      title: "포트폴리오 & 노션",
      url: "https://notion.so",
      description: "진행했던 활동과 프로젝트 상세 정리",
      icon: "📑",
      category: "project",
    },
    {
      id: "4",
      title: "인스타그램",
      url: "https://instagram.com",
      description: "일상과 소소한 순간들 공유",
      icon: "📸",
      category: "contact",
    },
    {
      id: "5",
      title: "이메일 문의 & 커피챗",
      url: "mailto:contact@example.com",
      description: "협업, 프로젝트 질문 등 언제든 편하게 연락주세요!",
      icon: "✉️",
      category: "contact",
      badge: "Open",
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
  const [likes, setLikes] = useState<number>(12);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // 로컬 스토리지에서 응원 수 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLikes = localStorage.getItem("profile_likes");
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
    triggerToast("링크가 클립보드에 복사되었습니다! 📋");
  };

  const handleShareProfile = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} | 프로필 링크`,
          text: profile.bio,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // 취소했거나 미지원 시 클립보드로 폴백
      }
    }

    navigator.clipboard.writeText(shareUrl);
    triggerToast("프로필 주소가 복사되었습니다! ✨");
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem("profile_likes", newLikes.toString());

    // 플로팅 하트 이펙트
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.random() * 60 - 30;
    const newHeart = { id: Date.now() + Math.random(), x };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 900);
  };

  const filteredLinks = profile.links.filter((link) => {
    if (selectedCategory === "all") return true;
    return link.category === selectedCategory;
  });

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 sm:py-14 bg-gradient-to-b from-slate-50 via-zinc-100 to-slate-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-blue-500 selection:text-white overflow-hidden">
      
      {/* 🌟 배경 앰비언트 글로우 오브 (은은한 오로라 효과) */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-400/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[40%] right-[-150px] w-[400px] h-[400px] bg-gradient-to-bl from-teal-400/15 to-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto flex flex-col items-center z-10">
        
        {/* 상단 퀵 네비게이션 액션 버튼 (QR & 공유) */}
        <header className="w-full flex items-center justify-between mb-4 px-1">
          {/* 상태 뱃지 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-700/60 shadow-xs backdrop-blur-md text-xs font-medium text-zinc-600 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profile.status}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* QR 코드 보기 버튼 */}
            <button
              onClick={() => setShowQrModal(true)}
              type="button"
              className="p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 shadow-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:scale-105 active:scale-95 transition-all"
              title="QR 코드로 보기"
              aria-label="QR 코드"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>

            {/* 공유하기 버튼 */}
            <button
              onClick={handleShareProfile}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 shadow-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:scale-105 active:scale-95 transition-all"
              title="프로필 링크 공유하기"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>공유</span>
            </button>
          </div>
        </header>

        {/* 🪪 메인 프로필 헤더 카드 (글래스모피즘 & 세련된 디테일) */}
        <section className="relative w-full flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-white/60 dark:border-zinc-800/90 backdrop-blur-xl shadow-xl shadow-zinc-200/50 dark:shadow-black/40 mb-6 transition-all">
          
          {/* 아바타 이미지 (트렌디한 그라데이션 테두리 링) */}
          <div className="relative mb-4 group cursor-pointer">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-pink-500 opacity-80 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white dark:bg-zinc-900 overflow-hidden shadow-lg flex items-center justify-center">
              {!avatarError ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="rounded-full object-cover p-1 group-hover:scale-105 transition-transform duration-300"
                  priority
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl select-none">
                  {profile.name[0]}
                </div>
              )}
            </div>
          </div>

          {/* 이름 & 소제목 */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {profile.name}
          </h1>
          {profile.title && (
            <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {profile.title}
            </p>
          )}

          {/* 태그 / 뱃지 */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
              🎓 한양대학교
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 shadow-2xs">
              ⚡ 바이브 코딩
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
              🚀 Next.js 16
            </span>
          </div>

          {/* 자기소개 */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-sm px-1">
            {profile.bio}
          </p>

          {/* 빠른 소셜 링크 아이콘 바 */}
          {profile.socials && (
            <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 w-full max-w-xs">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 active:scale-95 transition-all"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {profile.socials.blog && (
                <a
                  href={profile.socials.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 active:scale-95 transition-all"
                  title="Blog"
                  aria-label="Blog"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </a>
              )}
              {profile.socials.instagram && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 active:scale-95 transition-all"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {profile.socials.email && (
                <a
                  href={profile.socials.email}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 active:scale-95 transition-all"
                  title="Email"
                  aria-label="Email"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </section>

        {/* 🗂️ 카테고리 필터 탭 */}
        <div className="w-full flex items-center justify-center gap-1.5 p-1 mb-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800">
          {[
            { id: "all", label: "전체" },
            { id: "project", label: "프로젝트" },
            { id: "blog", label: "블로그" },
            { id: "contact", label: "소통" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as Category)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === tab.id
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔗 링크 카드 리스트 */}
        <section className="w-full flex flex-col gap-3 mb-8">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} onCopy={handleCopyLink} />
          ))}
        </section>

        {/* ❤️ 인터랙티브 응원하기 버튼 */}
        <div className="relative mb-8">
          <button
            onClick={handleLike}
            type="button"
            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 hover:from-rose-500/20 hover:to-pink-500/20 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/60 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-semibold"
          >
            <span className="text-base group-hover:scale-125 transition-transform">❤️</span>
            <span>응원 남기기</span>
            <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-zinc-800/80 text-[11px] font-bold text-rose-600 dark:text-rose-300 shadow-2xs">
              {likes}
            </span>
          </button>

          {/* 떠오르는 하트 애니메이션 */}
          {floatingHearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute left-1/2 -top-2 text-rose-500 pointer-events-none text-xl animate-float-heart select-none"
              style={{ transform: `translateX(${heart.x}px)` }}
            >
              💖
            </span>
          ))}
        </div>

        {/* 🦶 푸터 */}
        <footer className="text-center text-xs text-zinc-400 dark:text-zinc-500 pb-4 flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-[11px] opacity-75">Designed with Next.js & Vibe Coding ✨</p>
        </footer>
      </div>

      {/* 📱 QR 코드 모달 */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-xs bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">
              QR 코드로 접속하기
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              스마트폰 카메라로 스캔하여 바로 이동하세요.
            </p>

            {/* QR 이미지 생성기 */}
            <div className="p-3 bg-white rounded-2xl shadow-inner border border-zinc-100 mb-4">
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
              className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 🔔 토스트 알림 컴포넌트 */}
      <Toast message={toastMessage} isVisible={showToast} />
    </main>
  );
}

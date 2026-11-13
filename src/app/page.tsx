"use client";

import React, { useState, useEffect } from "react";
import { LinkItem, ProfileData } from "@/types/link";
import mockData from "@/data/links.json";
import { Plus } from "lucide-react";

// 재사용 가능한 컴포넌트 모음
import ProfileHeader from "@/components/ProfileHeader";
import ProfileCard from "@/components/ProfileCard";
import LinkCard from "@/components/LinkCard";
import QrModal from "@/components/QrModal";
import AddLinkModal from "@/components/AddLinkModal";
import Toast from "@/components/Toast";

// Firebase Firestore 연동
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

// 사진 2번 기반의 심플하고 깔끔한 기본 링크 목록
const defaultLinks: LinkItem[] = [
  {
    id: "link-instagram",
    title: "Instagram",
    url: "https://instagram.com",
    category: "contact",
    icon: "📷",
  },
  {
    id: "link-youtube",
    title: "YouTube",
    url: "https://youtube.com",
    category: "blog",
    icon: "▶️",
  },
  {
    id: "link-blog",
    title: "Blog",
    url: "https://velog.io",
    category: "blog",
    icon: "📝",
  },
  {
    id: "link-github",
    title: "GitHub",
    url: "https://github.com/Chogosu123",
    category: "project",
    icon: "💻",
  },
  {
    id: "link-portfolio",
    title: "Portfolio",
    url: "https://notion.so",
    category: "project",
    icon: "🌐",
  },
  {
    id: "link-myblog",
    title: "My Blog",
    url: "https://velog.io",
    category: "blog",
    icon: "🌐",
  },
];

const initialProfile: ProfileData = {
  name: mockData.data.profile.name,
  title: mockData.data.profile.title,
  bio: "", // 소개글 제거 (심플 프로필)
  status: mockData.data.profile.status,
  avatarUrl: "/avatar.png",
  links: defaultLinks,
  socials: {
    github: mockData.data.profile.socials.github ?? undefined,
    blog: mockData.data.profile.socials.blog ?? undefined,
    instagram: mockData.data.profile.socials.instagram ?? undefined,
    email: mockData.data.profile.socials.email ?? undefined,
  },
};

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Firestore users/anonymous/links 경로에서 createdAt 기준 최신순 정렬 구독
    const linksCol = collection(db, "users", "anonymous", "links");
    const q = query(linksCol, orderBy("createdAt", "desc"));

    // 페이지 로드 시 실시간 구독 (링크 추가/수정/삭제 시 자동 목록 갱신)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreLinks: LinkItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title || "",
              url: data.url || "",
              description: data.description || undefined,
              category: data.category || "project",
              icon: data.icon || "🔗",
              badge: data.badge || undefined,
            };
          });

          setProfile((prev) => ({ ...prev, links: firestoreLinks }));

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "profile_links_simple_v2",
              JSON.stringify(firestoreLinks)
            );
          }
        } else {
          // Firestore에 데이터가 아직 없으면 기본 링크 목록 표시
          setProfile((prev) => ({ ...prev, links: defaultLinks }));
        }
      },
      (error) => {
        console.error("Firestore 실시간 리스너 오류:", error);
        // 에러 발생 시 로컬 스토리지 데이터 백업 로드
        if (typeof window !== "undefined") {
          const savedLinks = localStorage.getItem("profile_links_simple_v2");
          if (savedLinks) {
            try {
              const parsed = JSON.parse(savedLinks);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setProfile((prev) => ({ ...prev, links: parsed }));
              }
            } catch (e) {
              console.error("로컬 링크 파싱 실패:", e);
            }
          }
        }
      }
    );

    return () => {
      unsubscribe();
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const triggerToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    setShowToast(true);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleShareProfile = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = window.location.href;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // 무시
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name}님의 링크`,
          url: shareUrl,
        });
      } catch {
        // 무시
      }
    }

    triggerToast("프로필 링크를 복사했어요");
  };

  // 링크 추가 핸들러: Firestore users/anonymous/links에 저장
  const handleAddLink = async (newLinkData: LinkItem) => {
    try {
      // 1. Firestore users/anonymous/links 컬렉션에 추가
      const docRef = await addDoc(
        collection(db, "users", "anonymous", "links"),
        {
          title: newLinkData.title,
          url: newLinkData.url,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          ...(newLinkData.description ? { description: newLinkData.description } : {}),
          ...(newLinkData.category ? { category: newLinkData.category } : {}),
          ...(newLinkData.icon ? { icon: newLinkData.icon } : {}),
          ...(newLinkData.badge ? { badge: newLinkData.badge } : {}),
        }
      );

      // 2. 즉각적인 UI 반영을 위한 상태 업데이트 (onSnapshot에서도 실시간 동기화됨)
      const newLink: LinkItem = {
        ...newLinkData,
        id: docRef.id,
      };

      setProfile((prev) => {
        if (prev.links.some((l) => l.id === newLink.id)) {
          return prev;
        }
        return {
          ...prev,
          links: [newLink, ...prev.links],
        };
      });

      triggerToast("새로운 링크가 추가되었어요! 🎉");
    } catch (error) {
      console.error("Firestore 링크 저장 실패:", error);
      triggerToast("Firestore 저장 실패: 연결 상태 또는 설정을 확인해주세요.");
      throw error;
    }
  };

  // 링크 삭제 핸들러
  const handleDeleteLink = async (id: string) => {
    try {
      // Firestore 등록 문서인 경우 삭제
      if (id && !id.startsWith("link-")) {
        await deleteDoc(doc(db, "users", "anonymous", "links", id));
      }
    } catch (err) {
      console.warn("Firestore 삭제 실패 또는 문서 미존재:", err);
    }

    setProfile((prev) => {
      const updated = prev.links.filter((l) => l.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "profile_links_simple_v2",
          JSON.stringify(updated)
        );
      }
      return {
        ...prev,
        links: updated,
      };
    });
    triggerToast("링크를 삭제했어요");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-[#F2F4F6] text-[#191F28] py-4 px-4">
      {/* 📱 모바일 최적화 컨테이너 (최대 480px) */}
      <div className="w-full max-w-[460px] mx-auto flex flex-col items-center">
        {/* 1. 상단 앱바 */}
        <ProfileHeader
          status={profile.status}
          onOpenQr={() => setShowQrModal(true)}
          onShare={handleShareProfile}
          onOpenAdd={() => setShowAddModal(true)}
        />

        {/* 2. 1번째 사진 기반 상단 프로필 카드 (20대 공대생 원형 아바타, 소개글 없음, 심플) */}
        <ProfileCard profile={profile} />

        {/* 3. 2번째 사진 기반 심플 링크 목록 */}
        <section className="w-full flex flex-col gap-2.5 my-2">
          {profile.links.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onDelete={handleDeleteLink}
            />
          ))}

          {/* 4. 맨 밑에 새 링크 추가 버튼 */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="w-full h-[58px] mt-1 bg-white hover:bg-[#F9FAFB] rounded-xl border border-dashed border-[#D1D6DB] hover:border-[#3182F6] hover:text-[#3182F6] text-[#4E5968] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>새 링크 추가</span>
          </button>
        </section>

        {/* 5. 심플 푸터 */}
        <footer className="text-center text-[12px] text-[#8B95A1] py-8 flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </footer>
      </div>

      {/* 6. QR 모달 */}
      <QrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
      />

      {/* 7. React Hook Form & Zod 기반 링크 추가 다이얼로그 */}
      <AddLinkModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddLink={handleAddLink}
      />

      {/* 8. 토스트 알림 */}
      <Toast message={toastMessage} isVisible={showToast} />
    </main>
  );
}

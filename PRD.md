# 📋 제품 요구사항 정의서 (PRD): 마이링크 (MyLink)

---

## 1. 프로젝트 개요 (Overview)
- **서비스명:** 마이링크 (MyLink)
- **서비스 형태:** 멀티 유저 링크트리(Linktree) 클론 SaaS 플랫폼
- **기획 의도:** 복잡한 개발이나 디자인 과정 없이, 누구나 소셜 로그인으로 1분 만에 가입하여 자신만의 링크와 미디어(유튜브, 음악, 배너 등)를 한곳에 모아 공유할 수 있는 나만의 프로필 페이지 제작 서비스
- **공개 주소 체계:** `https://mylink.com/@{username}` (사용자 고유 슬러그)

---

## 2. 타겟 사용자 및 핵심 가치 (Target & Value)

### 2.1 타겟 사용자
- 인스타그램, 유튜브, 깃허브, 틱톡 등 여러 채널을 운영하는 **크리에이터 및 인플루언서**
- 포트폴리오, 이력서, 기술 블로그를 하나로 깔끔하게 묶어 전달하고 싶은 **개발자 및 디자이너**
- 예약 링크, 스마트스토어, 문의처를 프로필 하나로 해결하고 싶은 **1인 사업가 및 프리랜서**

### 2.2 핵심 가치 (Value Proposition)
1. **Zero-Friction 온보딩:** 구글/카카오 원클릭 소셜 로그인 및 즉시 고유 URL 선점
2. **풍부한 미디어 표현:** 텍스트 링크에 국한되지 않고 유튜브 영상, 오디오 플레이어, 텍스트 배너 등 다양한 위젯 지원
3. **원클릭 테마 엔진:** 디자인 고민 없이 트렌디한 테마 프리셋(토스 블루, 네오브루탈리즘, 다크 오로라 등) 원클릭 적용
4. **지연 없는 실시간 미리보기:** 대시보드 편집과 동시에 오른쪽 모바일 화면에서 결과 즉각 확인

---

## 3. 기술 스택 및 아키텍처 (Tech Stack)

| 레이어 | 기술 | 선정 이유 |
|---|---|---|
| **프론트엔드 프레임워크** | **Next.js 16 (App Router)** | 서버 컴포넌트(RSC), 빠른 SSR/FCP 및 SEO 최적화 |
| **언어 & 스타일** | **TypeScript, Tailwind CSS** | 타입 안정성 및 일관된 유틸리티 퍼스트 디자인 시스템 |
| **전역 상태 관리** | **Zustand** | 초경량(1.1KB), 보일러플레이트 없는 실시간 모바일 미리보기 상태 동기화 |
| **백엔드 & BaaS** | **Supabase** | 구글/카카오 OAuth 인증, PostgreSQL RLS 보안, 이미지 스토리지 일체형 지원 |
| **아이콘 & 인터랙션** | **Lucide React, @hello-pangea/dnd** | 직관적인 아이콘 및 부드러운 드래그 앤 드롭 정렬 |
| **배포 플랫폼** | **Vercel** | Next.js 최적화된 글로벌 엣지 네트워크 배포 |

---

## 4. 핵심 기능 명세 (Feature Specifications)

### 4.1 인증 및 계정 관리 (Authentication)
- **소셜 로그인:** Supabase Auth를 통한 구글 및 카카오 원클릭 로그인
- **온보딩 프로세스:**
  - 최초 로그인 시 중복 없는 고유 닉네임(`username`) 입력 (영문/숫자/언더바, 정규식 검증)
  - 닉네임 실시간 중복 체크 API 제공
- **세션 유지 및 자동 로그인:** 브라우저 종료 후 재방문 시 세션 토큰 자동 복구

---

### 4.2 관리자 대시보드 (`/admin`)
대시보드는 **[좌측 에디터 패널]**과 **[우측 실시간 모바일 미리보기 패널]** 2단 반응형으로 구성됩니다.

#### A. 프로필 헤더 에디터
- **아바타 이미지 업로드:** 로컬 이미지 선택 시 Supabase Storage 버킷에 업로드 후 CDN URL 저장
- **표시 이름 & 한 줄 소개:** 텍스트 수정 즉시 Zustand 스토어를 거쳐 모바일 미리보기에 실시간 반영
- **소셜 아이콘 퀵바:** GitHub, Instagram, Velog, Email, X(Twitter) 등의 링크를 컴팩트 아이콘으로 관리

#### B. 링크 및 미디어 블록 관리 (CRUD)
- **지원 블록 종류:**
  1. **일반 링크 블록:** 타이틀, 클릭 URL, 부가 설명, 아이콘/이모지, 뱃지(NEW, HOT, 대표 등)
  2. **유튜브 영상 블록:** 유튜브 영상 URL 입력 시 모바일 화면에서 즉시 재생 가능한 반응형 iframe 렌더링
  3. **음악/오디오 블록:** 스포티파이 / 사운드클라우드 임베드 플레이어
  4. **섹션 타이틀 / 배너 블록:** 링크 카테고리를 분리할 수 있는 텍스트 헤더
- **드래그 앤 드롭 정렬 (DND):** 마우스 드래그로 블록 노출 순서를 자유롭게 재배치 (`position` 자동 재계산)
- **노출 토글 (Active Switch):** 블록을 삭제하지 않고 일시적으로 숨김/노출 처리
- **저장/동기화 알림:** 변경 사항 발생 시 우상단에 "변경 사항 저장" 버튼 활성화 및 자동 디바운스 동기화

#### C. 테마 프리셋 엔진
- 사전 제작된 5종의 완성도 높은 디자인 프리셋 제공:
  - 💙 **Toss Blue:** 정갈한 그레이 배경(`grey-100`) + 토스 블루(`blue-500`) 단일 강조색
  - ⬛ **Modern Minimal:** 순백의 화이트 카드 + 세련된 모노크롬 블랙 타이포그래피
  - 🟨 **Neobrutalism:** 3px 굵은 검은 테두리 + 하드 드롭 섀도우 + 파스텔 옐로우 포인트
  - 🌌 **Dark Aurora:** 짙은 다크 네이비 배경 + 네온 퍼플/에메랄드 앰비언트 글로우
  - 🌸 **Pastel Retro:** 부드러운 파스텔 톤과 레트로 감성의 둥근 카드

---

### 4.3 공개 프로필 뷰어 (`/@{username}`)
- **동적 라우팅:** Next.js `src/app/@[username]/page.tsx`를 통한 동적 페이지 서빙
- **SSR & 메타데이터 최적화:** 사용자 프로필 사진 및 소개글 기반 Open Graph(카카오톡, SNS 링크 미리보기) 자동 생성
- **공유 편의 기능:**
  - 프로필 URL 원클릭 복사 및 세련된 토스트(Toast) 알림
  - 스마트폰 카메라로 즉시 스캔 가능한 QR 코드 팝업 모달
  - 모바일 기기 접속 시 네이티브 Web Share API 호출 지원

---

## 5. 전역 상태 관리 설계 (Zustand Store)

```typescript
// src/store/useLinkStore.ts
import { create } from "zustand";

export interface LinkBlock {
  id: string;
  type: "link" | "youtube" | "music" | "header";
  title: string;
  url: string;
  description?: string;
  icon?: string;
  badge?: string;
  isActive: boolean;
  position: number;
}

export interface ProfileState {
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  socials: Record<string, string>;
}

interface LinkStore {
  profile: ProfileState;
  links: LinkBlock[];
  isSaving: boolean;
  
  // Actions
  setProfile: (data: Partial<ProfileState>) => void;
  setTheme: (themeId: string) => void;
  addLink: (link: Omit<LinkBlock, "id" | "position">) => void;
  updateLink: (id: string, updated: Partial<LinkBlock>) => void;
  deleteLink: (id: string) => void;
  toggleLink: (id: string) => void;
  reorderLinks: (sourceIndex: number, destIndex: number) => void;
  syncWithServer: () => Promise<void>;
}
```

---

## 6. 데이터베이스 스키마 설계 (Supabase / PostgreSQL)

```sql
-- 1. 프로필 테이블 (profiles)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  full_name VARCHAR(50),
  bio TEXT,
  avatar_url TEXT,
  theme_id VARCHAR(30) DEFAULT 'toss-blue',
  social_links JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 링크 블록 테이블 (link_blocks)
CREATE TABLE public.link_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(20) DEFAULT 'link' NOT NULL, -- 'link', 'youtube', 'music', 'header'
  title VARCHAR(100) NOT NULL,
  url TEXT,
  description TEXT,
  icon VARCHAR(50),
  badge VARCHAR(30),
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  position INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Row Level Security (RLS) 보안 정책
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_blocks ENABLE ROW LEVEL SECURITY;

-- 누구나 프로필 및 활성 링크 열람 가능 (Public Read)
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Public links are viewable by everyone." 
  ON public.link_blocks FOR SELECT USING (is_active = true);

-- 본인 데이터만 수정 및 삭제 가능 (Owner Full Access)
CREATE POLICY "Users can update own profile." 
  ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own link blocks." 
  ON public.link_blocks FOR ALL USING (auth.uid() = user_id);
```

---

## 7. 개발 단계별 마일스톤 (Milestones)

1. **Sprint 1 (환경 구축 & 인증):**
   - Supabase 프로젝트 생성 및 DB 스키마/RLS 적용
   - Next.js에 Supabase Auth 연동 (구글/카카오 로그인 & 온보딩 슬러그 생성)
2. **Sprint 2 (대시보드 & Zustand 스토어):**
   - Zustand 기반 `useLinkStore` 구축
   - 프로필 편집기 및 링크 블록 CRUD + 드래그 앤 드롭 구현
   - 우측 실시간 모바일 뷰어 화면 동기화
3. **Sprint 3 (미디어 위젯 & 테마 엔진):**
   - 유튜브 및 음악 임베드 위젯 컴포넌트 개발
   - 5종 테마 프리셋 엔진 구축 및 테마 스위칭 연동
4. **Sprint 4 (공개 프로필 & 배포):**
   - `/@{username}` 동적 라우트 SSR 렌더링
   - QR 코드 생성 모달 및 공유 기능 추가
   - Vercel 프로덕션 배포 및 모바일 실기기 테스트

# 📋 제품 요구사항 정의서 (PRD): 마이링크 (MyLink)

> **버전:** v1.2.1 (shadcn/ui + 토스 디자인 시스템 융합 명세 반영)  
> **최종 수정일:** 2026-11-04  
> **프로젝트:** 멀티 유저 링크트리(Linktree) 클론 SaaS  
> **상태:** 기획 완료 / 개발 대기

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
| **언어 & 스타일** | **TypeScript, Tailwind CSS v4** | 타입 안정성 및 CSS-First 모던 유틸리티 스타일링 (모듈 CSS 배제, Tailwind CSS 100% 전면 통일) |
| **UI 컴포넌트 & 디자인 시스템** | **shadcn/ui + 토스 디자인 시스템 (TDS)** | shadcn/ui의 접근성 높은 컴포넌트 아키텍처 위에 `docs/design.md`의 토스 디자인 시스템 토큰을 결합한 커스텀 디자인 시스템 구축 |
| **전역 상태 관리** | **Zustand** | 초경량(1.1KB), 보일러플레이트 없는 실시간 모바일 미리보기 상태 동기화 |
| **백엔드 & BaaS** | **Supabase** | 구글/카카오 OAuth 인증, PostgreSQL RLS 보안, 이미지 스토리지 일체형 지원 |
| **아이콘 & 인터랙션** | **Lucide React, @hello-pangea/dnd** | 직관적인 아이콘 및 부드러운 드래그 앤 드롭 정렬 |
| **배포 플랫폼** | **Vercel** | Next.js 최적화된 글로벌 엣지 네트워크 배포 |

### 3.1 디자인 시스템 원칙 (shadcn/ui + 토스 디자인 시스템 융합)
- **아키텍처 구조 (shadcn/ui + TDS):**
  - **컴포넌트 뼈대(Core Architecture):** [shadcn/ui](https://ui.shadcn.com/)를 기본 컴포넌트 라이브러리로 채택하여 웹 접근성(A11y), 상태 제어, 키보드 인터랙션, 모듈형 코드 소유권을 확보합니다.
  - **시각 디자인 토큰(Design Tokens):** `docs/design.md`에 정의된 **토스 디자인 시스템(TDS)** 규격을 절대 삭제하지 않고 영구 보존하며, UI 디자인 시스템을 시스템화하여 구축하기 위한 단일 진실 공급원(Single Source of Truth)으로 사용합니다.
- **TDS 디자인 토큰 매핑:**
  - shadcn/ui의 기본 테마 변수(`--primary`, `--background`, `--foreground`, `--muted`, `--border`, `--radius` 등)를 TDS 토큰 규격(Toss Blue `#3182F6`, Grey Scale `#191F28` ~ `#F2F4F6`, Pretendard 타이포그래피, TDS Elevation 그림자)과 매핑하여 일체감 있는 토스 감성의 완성도 높은 UI를 제공합니다.
- **Tailwind CSS v4 CSS-First 테마 시스템:**
  - 별도의 JS/TS 설정 파일 없이 `src/app/globals.css`의 `@theme inline` 및 CSS 변수를 통해 TDS 팔레트와 shadcn 테마 토큰을 통합 관리합니다.
- **컴포넌트 확장 및 제작:**
  - 필요한 인터랙션 요소(Button, Dialog, Input, Dropdown Menu, Switch, Toast 등)는 `npx shadcn@latest add <component>`를 통해 `src/components/ui/`에 소스코드로 추가한 뒤, TDS 가이드라인에 맞게 스타일을 조율하여 커스텀 디자인 시스템으로 구축합니다.
- **`design.md` 보존 원칙:**
  - `docs/design.md`의 토스 디자인 시스템 문서는 삭제하지 않고 지속적으로 디자인 시스템 확장의 레퍼런스로 유지합니다.

### 3.2 스타일링 원칙 (Tailwind CSS 단일 표준 적용 & 모듈 CSS 배제)
- **모듈 CSS(`*.module.css`) 사용 배제:**
  - 본 프로젝트의 모든 페이지 및 컴포넌트 스타일은 별도의 CSS 모듈(`*.module.css`)을 사용하지 않으며, **Tailwind CSS 유틸리티 클래스로 100% 통일**하여 개발합니다.
  - 별도 분리된 CSS 파일 없이 컴포넌트 파일 내에 직접 선언된 Tailwind 유틸리티 클래스로 응집도와 생산성을 극대화합니다.
- **shadcn/ui 및 유틸리티 클래스 일원화:**
  - shadcn/ui 컴포넌트(`@/components/ui/*`)와 비즈니스 컴포넌트 모두 동일한 Tailwind 클래스 및 `cn()` 헬퍼를 활용하여 일관된 마크업/스타일 패턴을 유지합니다.
- **디자인 토큰 연동:**
  - 색상, 폰트, 여백, 반경, 그림자 등 모든 스타일 속성은 `src/app/globals.css`에 선언된 디자인 토큰을 활용한 Tailwind 클래스(`bg-background`, `text-primary`, `rounded-xl`, `border-border` 등)로 표준화합니다.

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

### 6.1 프로토타이핑용 더미 데이터 명세 (Mock Data / JSON)
실제 데이터베이스(Supabase) 연동 전, UI 컴포넌트 렌더링 및 인터랙션을 신속하게 검증하기 위해 백엔드 REST API 규격의 더미 데이터(`src/data/links.json`)를 사용합니다.

- **데이터 파일 위치:** `src/data/links.json`
- **적용 목적:**
  - 실제 DB 연결 전 프론트엔드 UI/UX 빠른 프로토타이핑 및 렌더링 테스트
  - 백엔드 REST API 표준 Envelope 패턴(`success`, `code`, `data`, `meta`) 사전 정의
  - 카테고리 필터링(전체, 프로젝트, 블로그, 연락처) 및 카드 뱃지 상태 사전 검증
- **Mock API 스키마 규격 (`GET /api/v1/links`):**
  - **`data.profile`**: 사용자 기본 정보(이름, 소개, 상태 메시지, 아바타, SNS 링크, 통계)
  - **`data.links`**: 링크 아이템 리스트(식별자, 타이틀, URL, 설명, 아이콘, 카테고리, 뱃지, 고정 여부, 순서, 클릭 수 등)
  - **`meta`**: 서버 타임스탬프 및 API 버전

---

## 7. 사용자 시나리오 (User Scenarios)

### 시나리오 1: 신규 크리에이터의 첫 페이지 개설 및 SNS 링크 등록 (Onboarding & Initial Setup)
- **페르소나:** 유튜브와 인스타그램을 운영하며 팬들과 소통하고 싶은 크리에이터 민수
- **목표:** 1분 만에 자신만의 프로필 페이지(`mylink.com/@minsu`)를 개설하고 SNS 링크를 모아놓기
- **진행 흐름:**
  1. 민수는 마이링크 랜딩 페이지에 접속하여 **[카카오로 3초 만에 시작하기]** 버튼을 클릭한다.
  2. 간편 인증 완료 후 온보딩 화면에서 본인의 인스타그램 아이디와 동일한 `@minsu` 닉네임을 입력하고 중복 확인을 통과한다.
  3. 관리자 대시보드(`/admin`)로 진입하여 프로필 사진을 등록하고 "IT와 일상을 기록하는 민수입니다"라는 한 줄 소개를 적는다.
  4. 좌측 편집기에서 [블록 추가]를 눌러 유튜브 최신 영상 URL과 인스타그램 프로필 링크를 등록한다.
  5. 우측 모바일 실시간 미리보기에서 유튜브 영상 썸네일과 버튼이 깔끔하게 렌더링된 것을 확인하고 [공개 발행]을 누른다.
  6. 인스타그램 프로필 바이오에 `https://mylink.com/@minsu` 주소를 복사해 등록한다.

---

### 시나리오 2: 링크 관리 및 드래그 앤 드롭 순서 변경 (Link Management & Reordering)
- **페르소나:** 포트폴리오와 이력서를 관리하는 취업 준비생 지우
- **목표:** 새로 업데이트한 노션 포트폴리오를 최상단에 배치하고, 이전 링크는 일시적으로 숨기기
- **진행 흐름:**
  1. 지우는 대시보드에 로그인하여 기존 링크 목록을 확인한다.
  2. [블록 추가]를 클릭해 "2026 최신 개발 포트폴리오" 노션 링크를 생성하고 `대표` 뱃지를 붙인다.
  3. 새로 만든 링크 블록의 드래그 핸들(⋮⋮)을 잡고 마우스로 끌어 목록의 가장 맨 위(1번째)로 이동시킨다.
  4. 이전 프로젝트 링크 블록의 [노출 토글(Switch)]을 꺼서 삭제하지 않고 비공개 처리한다.
  5. 우측 모바일 뷰어에서 1초 만에 최신 포트폴리오가 맨 위에 뜨고 비공개 링크가 사라진 것을 확인한다.

---

### 시나리오 3: 원클릭 테마 프리셋 변경 (Theme Switching)
- **페르소나:** 브랜드 무드에 맞춰 페이지 분위기를 바꾸고 싶은 디자이너 서연
- **목표:** 개발 지식 없이 클릭 한 번으로 세련된 "토스 블루" 또는 "네오브루탈리즘" 테마로 전환하기
- **진행 흐름:**
  1. 서연은 대시보드 상단의 [디자인/테마] 탭을 클릭한다.
  2. 제공되는 5종의 테마 프리셋 카드(Toss Blue, Modern Minimal, Neobrutalism 등) 중 마음에 드는 스타일을 클릭한다.
  3. 우측 모바일 뷰어 화면의 배경색, 버튼 모서리(border-radius), 폰트 스타일, 하드 섀도우가 실시간으로 즉시 변신하는 것을 확인한다.
  4. 가장 마음에 드는 [Toss Blue] 테마를 선택하고 [저장하기]를 누른다.

---

### 시나리오 4: 외부 방문자의 프로필 조회 및 QR 공유 (Visitor Experience & Sharing)
- **페르소나:** 크리에이터 민수의 인스타그램을 보다가 프로필 링크를 클릭한 팬 태호
- **목표:** 스마트폰에서 민수의 유튜브 영상을 바로 시청하고, 주변 친구에게 프로필 공유하기
- **진행 흐름:**
  1. 태호는 모바일 브라우저로 `https://mylink.com/@minsu`에 접속한다.
  2. 별도의 앱 설치나 로그인 없이 1초 만에 깔끔한 모바일 최적화 화면이 열린다.
  3. 상단에 임베드된 유튜브 영상을 탭하여 페이지 이동 없이 인라인으로 영상을 시청한다.
  4. 상단의 [QR 코드] 버튼을 눌러 현장에 있는 친구에게 화면을 보여주어 친구 카메라로 스캔하게 하거나, [공유] 버튼을 눌러 카카오톡으로 링크를 전달한다.

---

## 8. 메인 화면(방문자 뷰) 와이어프레임 (Wireframe)

상세 컴포넌트 규격 및 반응형 HTML 뷰어는 [`docs/WIREFRAME.md`](./WIREFRAME.md) 및 [`docs/wireframe.html`](./wireframe.html)을 참조합니다.

```text
┌──────────────────────────────────────────────┐
│  [● 활동 중]                       [QR] [공유] │ ← 1. 상단 액션 바 (52px)
├──────────────────────────────────────────────┤
│                                              │
│                   ╭─────╮                    │
│                   │ 🧑‍💻 │                     │ ← 2. 프로필 아바타 (80px 원형)
│                   ╰─────╯                    │
│                   이 주 성                    │ ← 2. 이름 (20px Bold)
│                  @jooseong                   │ ← 2. 고유 슬러그 (12px)
│                                              │
│        생각을 코드로 빠르게 실현하는 바이브         │ ← 2. 한 줄 바이오 (13px)
│       코딩을 즐겨요. 새로운 기술에 관심이 많습니다.     │
│                                              │
│           [🐙]   [📷]   [📝]   [✉️]           │ ← 2. 소셜 아이콘 바 (GitHub, IG 등)
│                                              │
├──────────────────────────────────────────────┤
│  ┌────────────────────────────────────────┐  │
│  │               ▶ [재생]                 │  │ ← 3. 미디어 임베드 블록 (유튜브 16:9)
│  │        최신 유튜브 프로젝트 영상         │  │
│  └────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [💻] GitHub 포트폴리오  [대표]         > │  │ ← 4. 링크 카드 1 (아이콘+제목+설명+뱃지)
│  │     학습 코드 및 오픈소스 프로젝트 모음      │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [📝] 기술 블로그 (Velog)               > │  │ ← 4. 링크 카드 2
│  │     바이브 코딩 학습 일지와 개발 회고        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [✉️] 커피챗 및 협업 문의               > │  │ ← 4. 링크 카드 3
│  │     언제든 편하게 이메일로 연락주세요       │  │
│  └────────────────────────────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│  ┌────────────────────────────────────────┐  │
│  │ 이주성 님에게 응원 남기기      [❤️ 응원 36] │  │ ← 5. 인터랙티브 응원 블록
│  └────────────────────────────────────────┘  │
│                                              │
│      [ ✨ 마이링크로 나만의 페이지 만들기 ]      │ ← 6. 바이럴 유입 배너 (Create CTA)
│         © 2026 MyLink. All rights reserved.  │ ← 6. 푸터 & 카피라이트
└──────────────────────────────────────────────┘
```

---

## 9. 개발 단계별 마일스톤 (Milestones)

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


"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LinkItem } from "@/types/link";
import { Category } from "@/components/CategoryTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle, Check, Link2, Sparkles } from "lucide-react";

/**
 * Zod 스키마 정의 (TDS 및 PRD 명세 준수)
 */
export const addLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "링크 제목을 입력해주세요.")
    .min(2, "제목은 최소 2글자 이상이어야 해요.")
    .max(30, "제목은 30자 이내로 입력해주세요."),
  url: z
    .string()
    .trim()
    .min(1, "연결할 웹 주소(URL)를 입력해주세요.")
    .refine((val) => {
      let candidate = val;
      if (!/^https?:\/\//i.test(candidate)) {
        candidate = `https://${candidate}`;
      }
      try {
        const parsed = new URL(candidate);
        const hasValidHost =
          parsed.hostname.includes(".") || parsed.hostname === "localhost";
        const hasValidProto =
          parsed.protocol === "http:" || parsed.protocol === "https:";
        return hasValidHost && hasValidProto;
      } catch {
        return false;
      }
    }, "올바른 도메인 형식을 입력해주세요. (예: github.com, naver.com)"),
  description: z
    .string()
    .max(50, "설명은 50자 이내로 입력해주세요.")
    .optional()
    .or(z.literal("")),
  category: z.enum(["project", "blog", "contact"]),
  icon: z
    .string()
    .max(4, "아이콘은 4글자 이내(이모지 1~2개)로 입력해주세요.")
    .optional()
    .or(z.literal("")),
  badge: z
    .string()
    .max(8, "뱃지는 8글자 이내로 입력해주세요.")
    .optional()
    .or(z.literal("")),
});

export type AddLinkFormData = z.infer<typeof addLinkSchema>;

interface AddLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: LinkItem) => void;
}

const PRESET_ICONS = ["🔗", "💻", "🚀", "📝", "🎨", "📱", "✉️", "🌟"];
const PRESET_BADGES = ["NEW", "HOT", "대표", "추천"];

const CATEGORY_OPTIONS: { id: Category; label: string }[] = [
  { id: "project", label: "프로젝트" },
  { id: "blog", label: "블로그" },
  { id: "contact", label: "연락처" },
];

export default function AddLinkModal({
  open,
  onOpenChange,
  onAddLink,
}: AddLinkModalProps) {
  const [isShaking, setIsShaking] = useState(false);

  // React Hook Form 초기화 (Zod Resolver 연동)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<AddLinkFormData>({
    resolver: zodResolver(addLinkSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      url: "",
      description: "",
      category: "project",
      icon: "🔗",
      badge: "",
    },
  });

  const titleValue = watch("title") || "";
  const urlValue = watch("url") || "";
  const descriptionValue = watch("description") || "";
  const categoryValue = watch("category");
  const iconValue = watch("icon") || "🔗";
  const badgeValue = watch("badge") || "";

  const handleClose = () => {
    reset();
    setIsShaking(false);
    onOpenChange(false);
  };

  // 폼 제출 성공 처리
  const onSubmit = (data: AddLinkFormData) => {
    let normalizedUrl = data.url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: data.title.trim(),
      url: normalizedUrl,
      description: data.description?.trim() || undefined,
      category: data.category,
      icon: data.icon?.trim() || "🔗",
      badge: data.badge?.trim() || undefined,
    };

    onAddLink(newLink);
    handleClose();
  };

  // 검증 실패 시 Shake 애니메이션
  const onError = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // 실시간 유효성 상태 계산
  const isTitleValid =
    !!touchedFields.title && !errors.title && titleValue.trim().length >= 2;
  const isUrlValid =
    !!touchedFields.url && !errors.url && urlValue.trim().length > 0;

  const normalizedPreview =
    urlValue.trim() && !/^https?:\/\//i.test(urlValue.trim())
      ? `https://${urlValue.trim()}`
      : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className={`flex flex-col h-full transition-transform ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        <DialogHeader onClose={handleClose}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E8F3FF] text-[#3182F6] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle>새 링크 추가하기</DialogTitle>
              <DialogDescription>
                React Hook Form과 Zod로 안전하게 검증돼요.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogContent className="space-y-4">
          {/* 1. 링크 제목 */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="link-title-input"
              className="text-[13px] font-semibold text-[#333D4B] flex items-center justify-between"
            >
              <span>
                제목 <span className="text-[#F04452]">*</span>
              </span>
              <span
                className={`text-[11px] font-normal tabular-nums ${
                  titleValue.length > 25
                    ? "text-[#F04452] font-semibold"
                    : "text-[#8B95A1]"
                }`}
              >
                {titleValue.length}/30
              </span>
            </label>
            <div className="relative">
              <Input
                id="link-title-input"
                {...register("title")}
                placeholder="예: GitHub 프로필, 내 포트폴리오"
                error={!!errors.title}
                isValid={isTitleValid}
                className={isTitleValid ? "pr-10" : ""}
                autoFocus
                maxLength={30}
              />
              {isTitleValid && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#20C997] pointer-events-none">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* 에러 피드백 */}
            {errors.title && (
              <div className="flex items-center gap-1.5 text-[12px] text-[#F04452] mt-0.5 animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.title.message}</span>
              </div>
            )}
            {isTitleValid && (
              <p className="text-[11px] text-[#20C997] mt-0.5 flex items-center gap-1">
                <span>멋진 링크 제목이에요!</span>
              </p>
            )}
          </div>

          {/* 2. 링크 URL */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="link-url-input"
              className="text-[13px] font-semibold text-[#333D4B] flex items-center justify-between"
            >
              <span>
                URL 주소 <span className="text-[#F04452]">*</span>
              </span>
              <span className="text-[11px] text-[#8B95A1] flex items-center gap-1">
                <Link2 className="w-3 h-3" />
                웹 링크
              </span>
            </label>
            <div className="relative">
              <Input
                id="link-url-input"
                {...register("url")}
                placeholder="예: naver.com 또는 https://github.com"
                error={!!errors.url}
                isValid={isUrlValid}
                className={isUrlValid ? "pr-10" : ""}
              />
              {isUrlValid && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#20C997] pointer-events-none">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* 에러 피드백 */}
            {errors.url && (
              <div className="flex items-center gap-1.5 text-[12px] text-[#F04452] mt-0.5 animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.url.message}</span>
              </div>
            )}

            {/* 자동 https 보정 안내 팁 */}
            {!errors.url && normalizedPreview && (
              <p className="text-[11px] text-[#6B7684] mt-0.5">
                💡 <span className="font-medium text-[#3182F6]">{normalizedPreview}</span> 으로 자동 연결돼요.
              </p>
            )}
          </div>

          {/* 3. 상세 설명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#333D4B] flex items-center justify-between">
              <span>설명 (선택)</span>
              <span className="text-[11px] font-normal text-[#8B95A1] tabular-nums">
                {descriptionValue.length}/50
              </span>
            </label>
            <Input
              {...register("description")}
              placeholder="링크에 대한 간단한 설명을 남겨보세요"
              maxLength={50}
            />
            {errors.description && (
              <p className="text-[12px] text-[#F04452] mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* 4. 카테고리 선택 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#333D4B]">
              카테고리 선택
            </label>
            <div className="flex items-center gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = categoryValue === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setValue("category", cat.id as "project" | "blog" | "contact", {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={`h-9 px-3.5 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#191F28] text-white shadow-xs font-semibold scale-102"
                        : "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="text-[12px] text-[#F04452] mt-0.5">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* 5. 아이콘/이모지 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#333D4B] flex items-center justify-between">
              <span>아이콘</span>
              <span className="text-[11px] text-[#8B95A1]">이모지 또는 심볼</span>
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {PRESET_ICONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setValue("icon", preset, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer ${
                    iconValue === preset
                      ? "bg-[#E8F3FF] border-2 border-[#3182F6] scale-105 shadow-xs"
                      : "bg-[#F2F4F6] border border-transparent hover:bg-[#E5E8EB]"
                  }`}
                >
                  {preset}
                </button>
              ))}
              <div className="w-16">
                <Input
                  {...register("icon")}
                  placeholder="직접"
                  error={!!errors.icon}
                  className="h-9 px-2 text-center text-sm"
                  maxLength={4}
                />
              </div>
            </div>
            {errors.icon && (
              <p className="text-[12px] text-[#F04452] mt-0.5">
                {errors.icon.message}
              </p>
            )}
          </div>

          {/* 6. 뱃지 (선택) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#333D4B] flex items-center justify-between">
              <span>뱃지 (선택)</span>
              <span className="text-[11px] text-[#8B95A1]">최대 8자</span>
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {PRESET_BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() =>
                    setValue("badge", badgeValue === b ? "" : b, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`h-8 px-2.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                    badgeValue === b
                      ? "bg-[#3182F6] text-white shadow-xs scale-102"
                      : "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
                  }`}
                >
                  {b}
                </button>
              ))}
              <div className="w-24">
                <Input
                  {...register("badge")}
                  placeholder="직접 입력"
                  error={!!errors.badge}
                  className="h-8 px-2 text-xs"
                  maxLength={8}
                />
              </div>
            </div>
            {errors.badge && (
              <p className="text-[12px] text-[#F04452] mt-0.5">
                {errors.badge.message}
              </p>
            )}
          </div>
        </DialogContent>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            size="l"
            onClick={handleClose}
            className="flex-1 cursor-pointer"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="l"
            className="flex-1 cursor-pointer"
          >
            추가하기
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

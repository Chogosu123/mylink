"use client";

import * as React from "react"
import { cn } from "cn"
import { X } from "lucide-react"

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-[420px] max-h-[90vh] flex flex-col bg-white rounded-[24px] border border-[#E5E8EB] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  className,
  children,
  onClose,
}: {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className={cn("p-6 pb-3 flex items-center justify-between border-b border-[#F2F4F6]", className)}>
      <div className="flex flex-col gap-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 -mr-1 rounded-full text-[#8B95A1] hover:text-[#191F28] hover:bg-[#F2F4F6] transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export function DialogTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className={cn("text-[18px] font-bold text-[#191F28] tracking-tight leading-tight", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-[13px] text-[#6B7684] leading-normal", className)}>
      {children}
    </p>
  );
}

export function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("p-6 py-4 overflow-y-auto scrollbar-thin flex flex-col gap-4", className)}>
      {children}
    </div>
  );
}

export function DialogFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("p-5 pt-3 border-t border-[#F2F4F6] flex items-center gap-2.5", className)}>
      {children}
    </div>
  );
}

import * as React from "react"
import { cn } from "cn"

/**
 * TDS (Toss Design System) Input Specification (docs/design.md 참조)
 * - Height: 48px
 * - Radius: 12px (radius-m)
 * - Background: #F2F4F6 (grey-100)
 * - Border: 1px #E5E8EB (grey-200)
 * - Focus: White background, 1.5px border #3182F6 (blue-500)
 * - Error: #F04452 (red-500) border with subtle reddish tint
 * - Valid: #20C997 (green-500) border when valid
 * - Font: 15px Regular (Pretendard)
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  isValid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, isValid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl bg-[#F2F4F6] px-4 text-[15px] text-[#191F28] transition-all duration-150 outline-none",
          "border border-[#E5E8EB] placeholder:text-[#8B95A1]",
          "focus:bg-white focus:border-[#3182F6] focus:ring-1 focus:ring-[#3182F6]",
          error && "border-[#F04452] bg-[#FFF5F5] focus:bg-white focus:border-[#F04452] focus:ring-1 focus:ring-[#F04452]",
          !error && isValid && "border-[#20C997] focus:border-[#20C997] focus:ring-1 focus:ring-[#20C997]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

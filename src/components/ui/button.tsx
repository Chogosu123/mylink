import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * TDS (Toss Design System) Button Specification (docs/design.md 참조)
 * - XL: 56px height, 16px radius, 17px Bold
 * - L:  48px height, 14px radius, 17px Bold
 * - M:  40px height, 12px radius, 15px Semibold
 * - S:  32px height, 10px radius, 13px Semibold
 * - Primary: Toss Blue (#3182F6) + White (화면당 1개)
 * - Secondary: Grey-100 (#F2F4F6) + Grey-900 (#191F28)
 * - Danger: Red-500 (#F04452) + White
 * - Ghost: Transparent + Blue-500
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-150 outline-none select-none active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#3182F6] text-white hover:bg-[#1B64DA] active:bg-[#1B64DA]",
        secondary:
          "bg-[#F2F4F6] text-[#191F28] hover:bg-[#E5E8EB] active:bg-[#D1D6DB]",
        outline:
          "border border-[#E5E8EB] bg-white text-[#191F28] hover:bg-[#F9FAFB] active:bg-[#F2F4F6]",
        ghost:
          "bg-transparent text-[#4E5968] hover:text-[#191F28] hover:bg-[#F2F4F6]",
        brandWeak:
          "bg-[#E8F3FF] text-[#3182F6] hover:bg-[#D4E8FF]",
        danger:
          "bg-[#F04452] text-white hover:bg-[#D93845]",
        default:
          "bg-[#3182F6] text-white hover:bg-[#1B64DA]",
      },
      size: {
        xl: "h-14 px-6 rounded-2xl text-[17px] font-bold tracking-tight",
        l: "h-12 px-5 rounded-[14px] text-[17px] font-bold tracking-tight",
        m: "h-10 px-4 rounded-xl text-[15px] font-semibold tracking-tight",
        s: "h-8 px-3 rounded-[10px] text-[13px] font-semibold tracking-tight",
        sm: "h-8 px-3 rounded-[10px] text-[13px] font-semibold tracking-tight",
        default: "h-10 px-4 rounded-xl text-[15px] font-semibold tracking-tight",
        icon: "h-10 w-10 rounded-full p-0 flex items-center justify-center",
        "icon-sm": "h-9 w-9 rounded-full p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "m",
    },
  }
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

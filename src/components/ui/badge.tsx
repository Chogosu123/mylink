import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * TDS (Toss Design System) Badge & Chip Specification (docs/design.md 참조)
 * - Badge: 22px height, 6px radius, washed semantic backgrounds
 * - Chip: 34px height, full pill, active flip states
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        // TDS Badge: 22px height, 6px radius
        default:
          "h-[22px] px-2 rounded-[6px] text-[11px] bg-[#E8F3FF] text-[#3182F6]",
        brand:
          "h-[22px] px-2 rounded-[6px] text-[11px] bg-[#E8F3FF] text-[#3182F6]",
        subtle:
          "h-[22px] px-2 rounded-[6px] text-[11px] bg-[#F2F4F6] text-[#4E5968]",
        success:
          "h-[22px] px-2 rounded-[6px] text-[11px] bg-[#E8F9F3] text-[#20C997]",
        danger:
          "h-[22px] px-2 rounded-[6px] text-[11px] bg-[#FEEBED] text-[#F04452]",
        outline:
          "h-[22px] px-2 rounded-[6px] text-[11px] border border-[#E5E8EB] bg-white text-[#4E5968]",
        
        // TDS Chip: 34px full pill
        chip:
          "h-[34px] px-3.5 rounded-full text-[13px] border border-[#E5E8EB] bg-white text-[#4E5968] hover:bg-[#F9FAFB]",
        chipActive:
          "h-[34px] px-3.5 rounded-full text-[13px] bg-[#191F28] text-white shadow-xs",
        chipBrand:
          "h-[34px] px-3.5 rounded-full text-[13px] bg-[#E8F3FF] text-[#3182F6]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

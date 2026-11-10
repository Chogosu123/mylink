import * as React from "react"
import { cn } from "cn"

/**
 * TDS (Toss Design System) Card Specification (docs/design.md 참조)
 * - Surface: Pure white (#FFFFFF)
 * - Border: 1px grey-200 (#E5E8EB) hairline
 * - Radius: 16px~20px (rounded-2xl)
 * - Elevation: Flat surface by default with subtle tds-shadow-1
 */
function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white rounded-2xl border border-[#E5E8EB] tds-shadow-1 transition-all overflow-hidden text-[#191F28]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("p-5 flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[18px] font-bold text-[#191F28] leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[14px] text-[#4E5968] leading-normal", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-5", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("p-5 pt-0 flex items-center", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export type Category = "all" | "project" | "blog" | "contact";

interface CategoryTabsProps {
  categories: { id: Category; label: string }[];
  selectedCategory: Category;
  onSelectCategory: (id: Category) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="w-full flex items-center gap-1.5 p-1 mb-3.5 overflow-x-auto scrollbar-none">
      {categories.map((tab) => {
        const isActive = selectedCategory === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            className="focus:outline-none cursor-pointer"
          >
            <Badge
              variant={isActive ? "chipActive" : "chip"}
              className="transition-all active:scale-95"
            >
              {tab.label}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}

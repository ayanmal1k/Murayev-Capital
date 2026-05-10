"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export type Language = "en" | "ru"

interface LanguageSwitcherProps {
  onLanguageChange?: (language: Language) => void
}

export function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>("ru")

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    onLanguageChange?.(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`w-16 bg-transparent border-[#eeefea] text-[#eeefea] hover:bg-[#eeefea] hover:text-[#0c0c0a] font-normal ${currentLang === 'ru' ? 'font-[family-name:var(--font-milk)]' : 'font-[family-name:var(--font-nhl-phoenix)] font-light'}`}
        >
          {currentLang.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="font-[family-name:var(--font-nhl-phoenix)] font-light">
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("ru")} className="font-[family-name:var(--font-milk)]">
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
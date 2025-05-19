"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { NavLinks } from "@/components/navigation/nav-links"
import { AuthButtons } from "@/components/navigation/auth-buttons"
import { UserMenu } from "@/components/navigation/user-menu"
import { MobileMenu } from "@/components/navigation/mobile-menu"

export interface User {
  name: string
  email: string
  image?: string
}

interface NavbarProps {
  isAuthenticated: boolean
  user?: User
}

export function Navbar({ isAuthenticated, user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full content-grid border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Calendar className="h-5 w-5 text-rose-500" />
          <span>Toast or Ghost</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLinks className="mr-4" />
          {isAuthenticated && user ? (<UserMenu user={user} />) : <AuthButtons />}
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>
    </header>
  )
}

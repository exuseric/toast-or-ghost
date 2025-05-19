"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface NavLinksProps {
  className?: string
  onClick?: () => void
  vertical?: boolean
}

export function NavLinks({ className, onClick, vertical = false }: NavLinksProps) {
  const pathname = usePathname()

  const navLinks = [
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/my-rsvps", label: "My RSVPs", icon: Calendar },
    { href: "/create-event", label: "Create Event", icon: Plus },
  ]

  return (
    <nav className={cn(vertical ? "flex flex-col space-y-4" : "flex items-center space-x-6", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-1.5 transition-colors hover:text-foreground/80",
              vertical ? "text-base" : "text-sm font-medium",
              isActive ? "text-foreground" : "text-foreground/60",
            )}
          >
            <link.icon className={cn(vertical ? "h-5 w-5" : "h-4 w-4")} />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

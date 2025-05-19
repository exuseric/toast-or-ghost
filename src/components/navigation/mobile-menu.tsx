"use client"

import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NavLinks } from "@/components/navigation/nav-links"
import { AuthButtons } from "@/components/navigation/auth-buttons"
import { UserMenu } from "@/components/navigation/user-menu"
import type { User } from "@/components/navigation/navbar"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isAuthenticated: boolean
  user?: User
}

export function MobileMenu({ isOpen, setIsOpen, isAuthenticated, user }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">RSVP Now</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-1 flex-col">
          <NavLinks vertical onClick={() => setIsOpen(false)} className="mb-6" />

          <div className="mt-auto border-t pt-4">
            {isAuthenticated && user ? <UserMenu user={user} vertical /> : <AuthButtons vertical />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

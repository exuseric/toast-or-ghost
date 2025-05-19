"use client"

import Link from "next/link"
import { Calendar, LogOut, UserIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "@supabase/supabase-js"
import { signOutAction } from "@/lib/supabase/actions"

interface UserMenuProps {
  user: User | null
  vertical?: boolean
}

const createInitials = (name: string) => {
  const nameParts = name.split(" ");
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
  return initials;
}

export function UserMenu({ user, vertical = false }: UserMenuProps) {
  
  if (!user) {
    return null;
  }

  // For vertical layout (mobile menu)
  if (vertical) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"https://api.dicebear.com/9.x/pixel-art/svg"} alt={user.user_metadata.full_name} />
            <AvatarFallback>{createInitials(user.user_metadata.full_name || "")}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.user_metadata.full_name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
        >
          <UserIcon className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/my-rsvps"
          className="flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
        >
          <Calendar className="h-4 w-4" />
          My RSVPs
        </Link>
        <Button
          variant="ghost"
          className="justify-start gap-2 px-0 text-sm font-medium text-foreground/60 hover:text-foreground/80"
          onClick={() => signOutAction()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    )
  }

  // For horizontal layout (desktop)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"https://api.dicebear.com/9.x/pixel-art/svg"} alt={user.user_metadata.full_name} />
            <AvatarFallback>{createInitials(user.user_metadata.full_name || "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.user_metadata.full_name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-rsvps" className="cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" />
            <span>My RSVPs</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOutAction()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

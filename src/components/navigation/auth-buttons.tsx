import Link from "next/link"

import { Button } from "@/components/ui/button"

interface AuthButtonsProps {
  className?: string
  vertical?: boolean
}

export function AuthButtons({ className, vertical = false }: AuthButtonsProps) {
  return (
    <div className={`flex ${vertical ? "flex-col space-y-2" : "items-center space-x-4"} ${className}`}>
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  )
}

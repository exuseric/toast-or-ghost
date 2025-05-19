import { Navbar } from "@/components/navigation/navbar";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Toast or Ghost",
  description: "An rsvp solution.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
    const mockUser = {
    name: "Jane Smith",
    email: "jane@example.com",
    }
  

  // Toggle between true/false to see different states
  const isAuthenticated = true
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <Navbar isAuthenticated={isAuthenticated} user={mockUser}/>
        {children}
      </body>
    </html>
  );
}

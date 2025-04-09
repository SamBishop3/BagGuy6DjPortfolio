import Link from "next/link"
import { Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeroSection from "./hero-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-6 w-6" />
            <span className="text-xl font-bold">DJ BagGuy</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#music" className="text-sm font-medium transition-colors hover:text-primary">
              Music
            </Link>
            <Link href="#events" className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </Link>
            <Link href="#gallery" className="text-sm font-medium transition-colors hover:text-primary">
              Gallery
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Hero Section with YouTube Background */}
      <HeroSection />

      {/* Rest of the content remains the same... */}
      {/* ... */}
    </div>
  )
}


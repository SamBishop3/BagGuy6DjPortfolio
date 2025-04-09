"use client"

import { Button } from "@/components/ui/button"


export default function HeroSection() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />



      <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">DJ BagGuy</h1>
        <p className="mt-4 max-w-3xl text-xl text-gray-200">Bringing the mix to you </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Book Now
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Listen to Mixes
          </Button>
        </div>
      </div>
    </section>
  )
}


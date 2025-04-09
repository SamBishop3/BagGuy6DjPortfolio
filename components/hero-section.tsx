"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const videos = [
    "/video/bagguy2.mp4", // Space in name must be URL-encoded
    "/video/bagguyclip3.mp4",
    "/video/bagguycolors.mp4",
  ]

  // Pick a random video on load
  useEffect(() => {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)]
    setCurrentVideo(randomVideo)
  }, [])

  // Set up video on load or mute change
  useEffect(() => {
    const video = videoRef.current
    if (!video || !currentVideo) return

    // Set loading state
    setIsLoading(true)

    // Handle video loading
    const handleCanPlay = () => {
      setIsLoading(false)
      console.log("✅ Video can play now")
    }

    video.addEventListener("canplay", handleCanPlay)

    // Set video source and properties
    video.src = currentVideo
    video.muted = isMuted
    video.load() // Force reload with new source

    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play()
        console.log("✅ Video playing:", currentVideo)
      } catch (err) {
        console.warn("⚠️ Autoplay blocked:", err)
        // If autoplay is blocked, we'll need user interaction
        setIsMuted(true)
        video.muted = true
      }
    }

    playVideo()

    // Handle video ended event for rotation
    const handleEnded = () => {
      console.log("Video ended, switching to next")
      let next
      do {
        next = videos[Math.floor(Math.random() * videos.length)]
      } while (next === currentVideo && videos.length > 1)
      setCurrentVideo(next)
    }

    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [currentVideo])

  // Update mute state when isMuted changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    console.log("Mute state updated:", isMuted ? "muted" : "unmuted")

    // If unmuting, ensure volume is up
    if (!isMuted && video.volume === 0) {
      video.volume = 0.5
    }
  }, [isMuted])

  // Toggle mute with better error handling
  const toggleMute = async () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    setIsMuted(nextMuted)

    if (!nextMuted) {
      try {
        // Some browsers require a new play() call after unmuting
        await video.play()
        console.log("✅ Unmuted and playing with sound")
      } catch (err) {
        console.warn("⚠️ Playback failed after unmuting:", err)
        // If unmuting fails, revert to muted
        setIsMuted(true)
        video.muted = true
        // Try to play muted
        video.play().catch((e) => console.warn("Still can't play:", e))
      }
    }
  }

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="animate-pulse text-white">Loading video...</div>
          </div>
        )}

        {currentVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop={false}
            playsInline
            className="object-cover w-full h-full"
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Mute/Unmute Button */}
      <Button
        onClick={toggleMute}
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40 border-white/20"
      >
        {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        <span className="sr-only">{isMuted ? "Unmute" : "Mute"} background video</span>
      </Button>

      {/* Hero Text */}
      <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">DJ BagGuy</h1>
  <p className="mt-4 max-w-3xl text-xl text-gray-200">Bringing the beat to your next event</p>
  <div className="mt-8 flex flex-wrap justify-center gap-4">
    <Link href="#contact">
      <Button size="lg" className="bg-primary hover:bg-primary/90">
        Book Now
      </Button>
    </Link>
    <Link href="#music">
      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
        Listen to Mixes
      </Button>
    </Link>
  </div>
</div>
    </section>
  )
}



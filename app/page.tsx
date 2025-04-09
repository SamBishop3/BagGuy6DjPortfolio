"use client";

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Instagram, Music, Mail, MapPin } from "lucide-react"
import { useState } from "react"
import {sendEmail } from "../app/api/email/route";
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import HeroSection from "@/components/hero-section"

// ✅ This is what you're missing:
export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        alert("Your booking request has been sent successfully!");
        event.currentTarget.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:text-primary transition-colors">
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
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Toggle menu">
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

      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {/* IMAGE PLACEMENT #1: DJ Profile Image */}
              {/* Replace with your DJ's profile image */}
              <Image src="/aboutpic/djbagguy.jpg" alt="DJ BagGuy" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About DJ BagGuy</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                With over a decade of experience, DJ BagGuy has been electrifying dance floors across the country.
                Specializing in house, techno, and EDM, his unique style and energy create unforgettable experiences.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                From intimate club settings to massive festival stages, DJ BagGuy adapts his sound to create the perfect
                atmosphere for any event. His technical skills and musical knowledge allow him to read the crowd and
                deliver exactly what they need.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link href="https://www.instagram.com/_BagGuy_/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
                <Link href="https://www.twitch.tv/dj_bagguy_" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" aria-label="Twitch">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                    </svg>
                    <span className="sr-only">Twitch</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="bg-muted py-16 md:py-24">
  <div className="container">
    <h2 className="text-3xl font-bold tracking-tight text-center md:text-4xl mb-12">Latest Mixes</h2>

    <Tabs defaultValue="house" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="house">Hip Hop</TabsTrigger>
        <TabsTrigger value="techno">Pop</TabsTrigger>
        <TabsTrigger value="edm">R&B</TabsTrigger>
      </TabsList>

      {/* HIP HOP */}
      <TabsContent value="house" className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="aspect-[16/9] relative mb-4 overflow-hidden rounded-md">
                  <Image
                    src={`/covers/cover${i}.jpg`} // Make sure you have cover1.jpg, cover2.jpg, cover3.jpg
                    alt={`Hip Hop Mix ${i}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-bold">Hip-Hop Mix {i}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  High-energy hip-hop tracks straight from the streets to the speakers.
                </p>
                <div className="mt-4">
                  <audio controls className="w-full" aria-label={`Hip-Hop Mix ${i}`}>
                    <source src={`/audio/hiphop${i}.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* POP */}
      <TabsContent value="techno" className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="aspect-[16/9] relative mb-4 overflow-hidden rounded-md">
                  <Image
                    src={`/popcovers/pop${i}.jpg`} // Images must be: pop1.jpg, pop2.jpg, pop3.jpg
                    alt={`Pop Mix ${i}`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-bold">Pop Vibes Mix {i}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Catchy pop rhythms that make you want to dance and sing along.
                </p>
                <div className="mt-4">
                  <audio controls className="w-full" aria-label={`Pop Mix ${i}`}>
                    <source src={`/audio/pop${i}.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* R&B */}
      <TabsContent value="edm" className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="aspect-[16/9] relative mb-4 overflow-hidden rounded-md">
                  <Image
                    src={`/rnbcovers/rnb${i}.jpg`} // Images must be: rnb1.jpg, rnb2.jpg, rnb3.jpg
                    alt={`R&B Mix ${i}`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-bold">Smooth R&B Mix {i}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Smooth and soulful R&B jams for the late-night vibe.
                </p>
                <div className="mt-4">
                  <audio controls className="w-full" aria-label={`R&B Mix ${i}`}>
                    <source src={`/audio/rnb${i}.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  </div>
</section>


      {/* Events Section */}
      <section id="events" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center md:text-4xl mb-12">Current Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Culinary Dropout",
                date: "Thursdays & Friday",
                time: "7:00 PM - 12:00 AM",
                location: "150 Turtle Creek Boulevard, Dallas,Tx",
                image:"/current.events/culinary.jpg",
              },
              {
                title: "Safari",
                date: "Sundays",
                time: "12:00 AM - 4:00 PM",
                location: "1311 Empire Central, Dallas,Tx",
                image:"/current.events/safari.jpg",
              },
              {
                title: "Temptation",
                date: "June 10, 2025",
                time: "6:00 PM - 12:00 AM",
                location: "Los Angeles, CA",
              },
            ].map((event, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  {/* IMAGE PLACEMENT #5: Event Images */}
                  {/* Replace with your event images */}
                  <Image
                  src={event.image || "/placeholder.jpg"} 
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full hover:bg-primary/80 transition-colors">Get Tickets</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
    {/* Gallery Section */}
<section id="gallery" className="bg-muted py-16 md:py-24">
  <div className="container">
    <h2 className="text-3xl font-bold tracking-tight text-center md:text-4xl mb-12">Gallery</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
        "gallery1.jpg",
        "gallery2.jpg",
        "gallery3.jpg",
        "gallery4.jpg",
        "gallery5.jpg",
        "gallery6.jpg",
        "gallery7.jpg",
        "gallery8.jpg",
        "gallery9.jpg",
        "gallery10.jpg",
        "gallery11.jpg",
        "gallery12.jpg",
      ].map((img, i) => (
        <div key={i} className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={`/gallerypics/${img}`}
            alt={`Gallery image ${i + 1}`}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  </div>
</section>


{/* Contact Section */}
<section id="contact" className="py-16 md:py-24 scroll-mt-24">
  <div className="container">
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Interested in booking DJ BagGuy for your next event? Fill out the form or contact directly.
        </p>
        <div className="mt-8 space-y-4">
          <div className="flex items-center">
            <Mail className="mr-4 h-5 w-5 text-muted-foreground" />
            <span>Opulentsoundexp@gmail.com</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-4 h-5 w-5 text-muted-foreground" />
            <span>Based in Dallas Texas</span>
          </div>
        </div>
        <div className="mt-8 flex space-x-4">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
          </Link>
          <Link href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" aria-label="Twitch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
              </svg>
              <span className="sr-only">Twitch</span>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="Name"
                placeholder="Your name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="senderEmail"
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="event" className="text-sm font-medium">
              Event Type
            </label>
            <select
              id="event"
              name="Event"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select event type</option>
              <option value="Club Nigh">Club Night</option>
              <option value="Festival">Festival</option>
              <option value="Private Event">Private Event</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="Message"
              placeholder="Event details, date, location, etc."
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button type="submit" className="w-full hover:bg-primary/80 transition-colors">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="border-t bg-muted py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2 hover:text-primary transition-colors">
            <Music className="h-6 w-6" />
            <span className="text-xl font-bold">DJ BagGuy</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
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
          <div className="flex space-x-4">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="Twitch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                </svg>
                <span className="sr-only">Twitch</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="container mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DJ BagGuy. All rights reserved.
        </div>
      </footer>
    </div>
  )
};


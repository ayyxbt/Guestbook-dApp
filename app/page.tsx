import Navbar from "./components/LandingPage/Navbar"
import Hero from "./components/LandingPage/HeroSection"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Hero />
      </div>
    </div>
  )
}
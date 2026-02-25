"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion"

export default function Home() {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Disable automatic browser scroll restoration
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Jump to the top of the page on load
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    
    // Trigger the glitch effect
    setIsGlitching(true)
    
    const timer = setTimeout(() => {
      setIsGlitching(false)
    }, 600) // matches glitch animation duration

    return () => clearTimeout(timer)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollY } = useScroll()
  const headingY = useTransform(scrollY, [0, 500], [0, -100])

  const light1X = useTransform(mouseX, (val: number) => val / 40)
  const light1Y = useTransform(mouseY, (val: number) => val / 40)
  const light2X = useTransform(mouseX, (val: number) => -val / 40)
  const light2Y = useTransform(mouseY, (val: number) => -val / 40)

  // Move the template hook to the top level
  const backgroundGlow = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)`

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

    return (
    <main className={`bg-black text-white overflow-x-hidden ${isGlitching ? 'glitch-active' : ''}`} onMouseMove={handleMouseMove}>

      {/* Cursor Magic Glow Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: backgroundGlow,
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5 backdrop-blur-xl bg-black/40 border-b border-white/10 z-50">
        <a href="#" className="font-semibold text-lg hover:text-white transition cursor-pointer">
          B J Sai Krishna
        </a>

        <div className="space-x-8 text-sm text-gray-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
      </nav>


      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Cinematic Background Lights */}
        <div className="absolute inset-0 -z-10">
          <motion.div style={{ x: light1X, y: light1Y }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl"></motion.div>
          <motion.div style={{ x: light2X, y: light2Y }} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-3xl"></motion.div>
        </div>

          <div className="relative text-center px-6">

          <motion.h1
            style={{y: headingY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
          >
            B J Sai Krishna
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-gray-400 text-lg md:text-2xl"
          >
            Filmmaker • Developer • Creator
          </motion.p>

          <div className="mt-20 text-gray-500 text-sm animate-bounce">
            ↓ Scroll
          </div>

        </div>
      </section>


      {/* ABOUT SECTION */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About Me
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            I build cinematic visuals and powerful digital experiences.
            I blend storytelling, engineering, and design to create meaningful work.
          </p>
        </div>
      </motion.section>


      {/* PROJECTS SECTION */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen px-8 py-20"
      >
        <h2 className="text-4xl font-bold text-center mb-16">
          Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[1,2,3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition duration-500"
            >
              <h3 className="text-xl font-semibold mb-4">
                Project {item}
              </h3>
              <p className="text-gray-400 text-sm">
                Cinematic storytelling meets technical precision.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Me
          </h2>
          <p className="text-gray-400">
            Let’s create something meaningful together.
          </p>
        </div>
      </motion.section>

    </main>
  )
}

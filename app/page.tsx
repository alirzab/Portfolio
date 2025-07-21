"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  X,
  Eye,
  Filter,
  ChevronDown,
  Send,
  Sparkles,
} from "lucide-react"
import Image from "next/image"

// Custom cursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", updateMousePosition)

    const hoverElements = document.querySelectorAll("button, a, [data-hover]")
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}

// Typing animation component
const TypingAnimation = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 bg-current ml-1"
      />
    </span>
  )
}

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// Portfolio data
const portfolioItems = [
  {
    id: 1,
    title: "Cyberpunk Cityscape",
    category: "Environment",
    software: "Blender",
    image: "/placeholder.svg?height=400&width=600",
    description: "A futuristic cyberpunk city with neon lighting and atmospheric effects.",
  },
  {
    id: 2,
    title: "Organic Sculpture",
    category: "Sculpture",
    software: "ZBrush",
    image: "/placeholder.svg?height=400&width=600",
    description: "Abstract organic form exploring natural curves and textures.",
  },
  {
    id: 3,
    title: "Mechanical Robot",
    category: "Character",
    software: "Maya",
    image: "/placeholder.svg?height=400&width=600",
    description: "Highly detailed mechanical robot with intricate components.",
  },
  {
    id: 4,
    title: "Fantasy Weapon",
    category: "Props",
    software: "Blender",
    image: "/placeholder.svg?height=400&width=600",
    description: "Mystical fantasy sword with magical elements and detailed textures.",
  },
  {
    id: 5,
    title: "Architectural Visualization",
    category: "Architecture",
    software: "3ds Max",
    image: "/placeholder.svg?height=400&width=600",
    description: "Modern architectural visualization with realistic lighting.",
  },
  {
    id: 6,
    title: "Character Portrait",
    category: "Character",
    software: "ZBrush",
    image: "/placeholder.svg?height=400&width=600",
    description: "Realistic character portrait with detailed facial features.",
  },
]

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const categories = ["All", "Environment", "Character", "Sculpture", "Props", "Architecture"]

  const filteredItems =
    selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <CustomCursor />
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            ALEX CHEN
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Portfolio", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
                data-hover
              >
                {item}
              </motion.a>
            ))}
          </div>

          <Button
            onClick={() => setDarkMode(!darkMode)}
            variant="ghost"
            size="icon"
            className="rounded-full"
            data-hover
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20"
        />

        <div className="text-center z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3D ARTIST
            </h1>
            <div className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300">
              <TypingAnimation text="Creating Digital Worlds" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Bringing imagination to life through cutting-edge 3D artistry, architectural visualization, and immersive
            digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="flex gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              data-hover
            >
              View Portfolio
            </Button>
            <Button size="lg" variant="outline" data-hover>
              Get In Touch
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Alex Chen - 3D Artist"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Passionate Digital Creator</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With over 8 years of experience in 3D artistry, I specialize in creating stunning visual experiences
                that bridge the gap between imagination and reality. My work spans across architectural visualization,
                character design, and immersive digital environments.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe in the power of visual storytelling and strive to create art that not only looks beautiful but
                also evokes emotion and tells a story.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { label: "Projects Completed", value: "150+" },
                  { label: "Years Experience", value: "8+" },
                  { label: "Happy Clients", value: "80+" },
                  { label: "Awards Won", value: "12" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
                  >
                    <div className="text-2xl font-bold text-blue-500">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${selectedCategory === category ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""}`}
                data-hover
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setLightboxImage(item.image)}
                  data-hover
                >
                  <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white">
                            <Eye className="w-5 h-5" />
                            <span>View Details</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">{item.software}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Work Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Work Highlights
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          </motion.div>

          <div className="space-y-20">
            {[
              {
                title: "Award-Winning Architectural Visualization",
                description:
                  "Created a photorealistic visualization for a luxury resort that won the International Architecture Award 2023.",
                image: "/placeholder.svg?height=400&width=600",
                stats: ["2M+ Views", "Featured in ArchDaily", "Client: Luxury Resorts Inc."],
              },
              {
                title: "Character Design for AAA Game",
                description:
                  "Designed and modeled the main character for an upcoming AAA video game title, focusing on realistic anatomy and detailed texturing.",
                image: "/placeholder.svg?height=400&width=600",
                stats: ["6 Months Development", "50+ Iterations", "Client: Major Game Studio"],
              },
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{highlight.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {highlight.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {highlight.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <div className="text-sm font-medium text-blue-500">{stat}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative ${index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                >
                  <Image
                    src={highlight.image || "/placeholder.svg"}
                    alt={highlight.title}
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent rounded-2xl"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ready to bring your vision to life? Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">alex.chen@3dartist.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">San Francisco, CA</p>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: X, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                    data-hover
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                data-hover
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              ALEX CHEN
            </div>
            <p className="text-gray-400 mb-8">Creating digital worlds, one polygon at a time.</p>
            <div className="flex justify-center items-center gap-2 text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>© 2024 Alex Chen. All rights reserved.</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage || "/placeholder.svg"}
                alt="Portfolio item"
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <Button
                onClick={() => setLightboxImage(null)}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Book, Search, Github, Code, Menu, X, ChevronRight, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-purple-600 flex items-center justify-center">
              <Github className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              RepoDoc
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              href="/"
              className="relative font-medium text-purple-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-purple-600 after:content-['']"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="relative font-medium text-gray-600 hover:text-purple-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300 after:content-['']"
            >
               About Us
            </Link>
            <Link
              href="#faq"
              className="relative font-medium text-gray-600 hover:text-purple-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300 after:content-['']"
            >
             FAQs
            </Link>
    
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/auth/sign-in">
              <Button variant="ghost" size="sm" className="hidden md:flex hover:text-purple-600 hover:bg-purple-50">
                Log in
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="hidden md:flex bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </Link>
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/"
                className="flex items-center justify-between py-2 text-purple-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="flex items-center justify-between py-2 text-gray-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/examples"
                className="flex items-center justify-between py-2 text-gray-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Examples
                <ChevronRight className="h-4 w-4" />
              </Link>
    
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10"></div>
          <div className="absolute top-0 right-0 -z-10 opacity-20">
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                <path d="M400 0H600V600H0V400C0 179.086 179.086 0 400 0Z" fill="url(#paint0_linear)" />
              </g>
              <defs>
                <linearGradient id="paint0_linear" x1="300" y1="0" x2="300" y2="600" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#C4B5FD" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid gap-12 lg:grid-cols-2 items-center"
            >
              <motion.div variants={fadeIn} className="flex flex-col space-y-6 max-w-xl">
                <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 w-fit">
                  Organize your repository documentation beautifully
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Transform your{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    GitHub docs
                  </span>{" "}
                  into organized knowledge
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                  RepoDoc helps you organize, search, and connect your repository documentation in one beautiful
                  interface, making it easier for developers to find what they need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-6 rounded-lg text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-lg text-base border-gray-300 hover:bg-gray-50">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Button>
                </div>
                <div className="flex items-center pt-4 space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"></div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">500+</span> developers use RepoDoc
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl blur-3xl opacity-20 -z-10 transform rotate-3"></div>
                <div className="relative w-full overflow-hidden rounded-xl border bg-white p-2 shadow-2xl">
                  <div className="flex items-center border-b p-3">
                    <div className="flex space-x-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-sm text-gray-500">
                      <Book className="h-4 w-4" />
                      My Repository Docs
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center rounded-lg border px-3 py-2 mb-6 bg-gray-50">
                      <Search className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Search your docs...</span>
                      <Button variant="outline" size="sm" className="ml-auto text-xs">
                        Filter
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex gap-4 rounded-lg border p-4 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
                            <Code className="h-6 w-6" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-40 rounded bg-gray-200"></div>
                            <div className="h-3 w-full rounded bg-gray-100"></div>
                            <div className="h-3 w-3/4 rounded bg-gray-100"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <motion.div
                variants={fadeIn}
                className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 mb-4"
              >
                Why Choose RepoDoc
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Documentation that works for your team
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-gray-600">
                Our platform makes GitHub documentation accessible, searchable, and beautiful. Built specifically for
                developers working with modern repositories.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Github className="h-10 w-10 text-white" />,
                  title: "Easy Integration",
                  desc: "Seamlessly integrates with your GitHub repositories and Turborepo setup with zero configuration.",
                },
                {
                  icon: <Code className="h-10 w-10 text-white" />,
                  title: "Beautiful UI",
                  desc: "Clean, modern interface that makes documentation a pleasure to use for your entire team.",
                },
                {
                  icon: <Search className="h-10 w-10 text-white" />,
                  title: "Powerful Search",
                  desc: "Find exactly what you need with our advanced search capabilities and smart filtering.",
                },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col items-center text-center group">
                  <div className="mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <motion.div
                variants={fadeIn}
                className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 mb-4"
              >
                Testimonials
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Loved by developers worldwide
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-gray-600">
                See what teams are saying about our documentation platform and how it's transformed their workflow.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  quote:
                    "RepoDoc has transformed how our team interacts with documentation. It's now a pleasure rather than a chore.",
                  author: "Nishant Singh",
                  role: "Lead Developer at AIT Pune",
                  stars: 5,
                },
                {
                  quote:
                    "The search functionality alone has saved us countless hours. Finding the right documentation is now instant.",
                  author: "Pranavi kundu",
                  role: "CTO at kunduAI",
                  stars: 5,
                },
                {
                  quote:
                    "Our onboarding time has been cut in half since we started using RepoDoc for our GitHub documentation.",
                  author: "Mohitesh Thakur",
                  role: "Engineering Manager at Thakur Foods",
                  stars: 4,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="p-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`h-5 w-5 ${j < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <motion.div
                variants={fadeIn}
                className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 mb-4"
              >
                FAQs
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Frequently Asked Questions
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-gray-600">
                Everything you need to know about RepoDoc and how it can help your team.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-3xl mx-auto bg-white rounded-xl border shadow-sm overflow-hidden"
            >
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "How does RepoDoc integrate with Turborepo?",
                    a: "RepoDoc seamlessly integrates with Turborepo by automatically detecting your repository structure and generating documentation based on your codebase. It works with your existing monorepo setup without requiring any changes to your workflow. Our system analyzes your project structure, dependencies, and documentation files to create a cohesive documentation experience.",
                  },
                  {
                    q: "Can I customize the documentation theme?",
                    a: "Yes, RepoDoc offers extensive customization options. You can adjust colors, typography, and layout to match your brand. We also provide several pre-built themes that you can use as a starting point. Our theming system is built on CSS variables, making it easy to create and share custom themes across your organization.",
                  },
                  {
                    q: "Is RepoDoc suitable for large repositories?",
                    a: "RepoDoc is built to scale with your repository. It efficiently handles large codebases and can process thousands of files without performance issues. Our search functionality is optimized for quick results even in massive repositories. We use advanced indexing techniques to ensure that even as your codebase grows, documentation remains fast and responsive.",
                  },
                  {
                    q: "How often is the documentation updated?",
                    a: "RepoDoc automatically updates your documentation whenever changes are pushed to your repository. You can also configure it to update on a schedule or manually trigger updates as needed. Our webhook integration ensures that your documentation is always in sync with your codebase, reflecting the latest changes and additions.",
                  },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Ready to transform your GitHub documentation?
              </motion.h2>
              <motion.p variants={fadeIn} className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join hundreds of development teams who have improved their documentation experience with RepoDoc.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-purple-700 hover:bg-gray-100 h-12 px-8 rounded-lg text-base">
                  Get Started for Free
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-purple-600 flex items-center justify-center">
                  <Github className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">RepoDoc</span>
              </div>
              <p className="text-gray-600">Making repository documentation beautiful and accessible.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

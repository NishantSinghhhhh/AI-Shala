'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronRight,
  Github,
  Search,
  ArrowRight,
  Loader2,
  Copy,
  Check,
  Download,
  BookOpen,
  Code,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useOpenAI } from '../../hooks/model'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function GeneratePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [repoLink, setRepoLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')

  const { data, loading: isGenerating, error, generate } = useOpenAI()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = () => {
    if (!repoLink) return
    generate(`Generate documentation for ${repoLink}`)
  }

  const handleCopyDocumentation = () => {
    if (!data) return
    navigator.clipboard.writeText(data)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTabChange = (tab: 'preview' | 'markdown'): void => {
    setActiveTab(tab)
  }

  const handleDownloadMarkdown = () => {
    if (!data) return
    const blob = new Blob([data], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'repodoc-documentation.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* HEADER - Same as original */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-transparent'
        }`}
      >
        {/* Header content remains the same */}
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
              <Github className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
              RepoDoc
            </span>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            <Link
              href="/generate"
              className="relative font-medium text-purple-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-purple-600 after:content-['']"
            >
              Home
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-b"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {[
                { href: '/', label: 'Home' },
          
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex justify-between py-2 font-medium text-gray-700 hover:text-purple-600"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10" />
          <div className="absolute top-0 right-0 -z-10 opacity-20">
            {/* SVG decoration omitted for brevity */}
          </div>

          <div className="container mx-auto px-4">
            {/* Hero */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-6xl mx-auto w-full text-center"
            >
              <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 mb-6">
                Generate Documentation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Transform your GitHub repository into{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  beautiful documentation
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Enter your repository URL below and we'll automatically generate comprehensive documentation for your project.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={repoLink}
                      onChange={(e) => setRepoLink(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={isGenerating || !repoLink}
                    className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        Generate <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Recommended: Public repos with good README & documentation.
                </p>
              </div>

              {/* Results */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                  <strong>Error:</strong> {error.message}
                </div>
              )}
              
              {/* Loading skeleton during generation */}
              {isGenerating && (
                <div className="mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="h-6 w-2/3 bg-gray-100 rounded animate-pulse mb-3"></div>
                    <div className="h-4 w-1/4 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Results display with improved UI */}
              {data && !isGenerating && (
               <div className="mt-6 bg-white w-[160%] mx-auto relative left-1/2 -translate-x-1/2 rounded-xl shadow border border-gray-100 overflow-hidden max-w-7xl">
                  <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Generated Documentation
                      </h2>
                      <p className="text-sm text-gray-500">
                        Documentation for {repoLink.split('/').slice(-2).join('/')}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button
                        onClick={handleCopyDocumentation}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1.5 text-sm"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" /> Copy
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={handleDownloadMarkdown}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1.5 text-sm"
                      >
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                  
                  {/* Custom tabs implementation instead of shadcn/ui */}
                  <div className="w-full">
                    <div className="border-b border-gray-100">
                      <div className="flex px-6">
                        <button
                          onClick={() => handleTabChange('preview')}
                          className={`flex items-center gap-1.5 py-3 px-4 font-medium text-sm transition-colors ${
                            activeTab === 'preview'
                              ? 'text-purple-700 border-b-2 border-purple-600'
                              : 'text-gray-600 hover:text-purple-700'
                          }`}
                        >
                          <BookOpen className="h-4 w-4" /> Preview
                        </button>
                        <button
                          onClick={() => handleTabChange('markdown')}
                          className={`flex items-center gap-1.5 py-3 px-4 font-medium text-sm transition-colors ${
                            activeTab === 'markdown'
                              ? 'text-purple-700 border-b-2 border-purple-600'
                              : 'text-gray-600 hover:text-purple-700'
                          }`}
                        >
                          <Code className="h-4 w-4" /> Markdown
                        </button>
                      </div>
                    </div>
                    
                    {/* Tab panel content */}
                    <div>
                      {/* Preview tab panel */}
                      {activeTab === 'preview' && (
                        <div className="px-6 py-8">
                          <article className="prose prose-purple max-w-none w-full">
                            <ReactMarkdown
                              components={{
                                code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return !inline && match ? (
                                    <div className="relative group">
                                      <button 
                                        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800/70 text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                          navigator.clipboard.writeText(String(children).trim())
                                        }}
                                      >
                                        <Copy className="h-3.5 w-3.5" />
                                      </button>
                                      <SyntaxHighlighter
                                        style={tomorrow}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                      >
                                        {String(children).trim()}
                                      </SyntaxHighlighter>
                                    </div>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  )
                                },
                                h1: ({ children }) => (
                                  <h1 className="text-3xl font-bold mt-0 mb-4">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-2xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-200">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
                                ),
                                table: ({ children }) => (
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">{children}</table>
                                  </div>
                                ),
                              }}
                            >
                              {data}
                            </ReactMarkdown>
                          </article>
                        </div>
                      )}
                      
                      {/* Markdown tab panel */}
                      {activeTab === 'markdown' && (
                        <div className="relative">
                          <button 
                            className="absolute top-4 right-4 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                            onClick={() => {
                              navigator.clipboard.writeText(data)
                              setCopied(true)
                              setTimeout(() => setCopied(false), 2000)
                            }}
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <SyntaxHighlighter
                            language="markdown"
                            style={tomorrow}
                            className="rounded-none"
                            showLineNumbers
                          >
                            {data}
                          </SyntaxHighlighter>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      
      </main>

      
      {/* FOOTER */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                <Github className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">RepoDoc</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} RepoDoc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
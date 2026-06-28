import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const LANGS = ['en', 'ru', 'tr']

export default function Navbar({ dark, onToggleTheme, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.collections, href: '#collections' },
    { label: t.nav.education, href: '#education' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-px bg-gold z-[60]"
        style={{ scaleX: progress, transformOrigin: '0%' }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? dark
              ? 'bg-obsidian/95 backdrop-blur-md border-b border-white/5'
              : 'bg-ivory/95 backdrop-blur-md border-b border-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-display text-xl md:text-2xl font-light tracking-widest uppercase transition-opacity hover:opacity-60"
          >
            LH
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`nav-link opacity-60 hover:opacity-100 ${dark ? 'text-ivory' : 'text-obsidian'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-xs tracking-widest uppercase px-1.5 py-0.5 transition-all ${
                    lang === l
                      ? 'text-gold border-b border-gold'
                      : dark ? 'text-taupe-light/50 hover:text-taupe-light' : 'text-taupe/50 hover:text-taupe'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`w-10 h-5 rounded-full relative transition-colors duration-400 border ${
                dark ? 'border-taupe bg-obsidian-light' : 'border-taupe-light bg-ivory-dark'
              }`}
            >
              <motion.span
                animate={{ x: dark ? 2 : 18 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute top-0.5 w-4 h-4 rounded-full bg-gold block"
              />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 py-1"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className={`block h-px w-full ${dark ? 'bg-ivory' : 'bg-obsidian'} origin-center transition-colors`}
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className={`block h-px w-full ${dark ? 'bg-ivory' : 'bg-obsidian'} transition-colors`}
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className={`block h-px w-full ${dark ? 'bg-ivory' : 'bg-obsidian'} origin-center transition-colors`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 ${
              dark ? 'bg-obsidian' : 'bg-ivory'
            }`}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => handleNav(link.href)}
                className={`font-display text-4xl font-light italic ${dark ? 'text-ivory' : 'text-obsidian'}`}
              >
                {link.label}
              </motion.button>
            ))}
            {/* Language switcher in mobile menu */}
            <div className="flex items-center gap-4 mt-4">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`font-body text-sm tracking-widest uppercase px-2 py-1 transition-all ${
                    lang === l ? 'text-gold border-b border-gold' : dark ? 'text-taupe-light/50' : 'text-taupe/50'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

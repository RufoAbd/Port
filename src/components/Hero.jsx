import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero({ dark, t }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleScroll = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
          alt=""
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/20' : 'bg-gradient-to-t from-ivory via-ivory/50 to-transparent'}`} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="section-label mb-6">
          {t.hero.eyebrow}
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className={`font-display leading-none ${dark ? 'text-ivory' : 'text-obsidian'}`}>
            <span className="block font-light italic" style={{ fontSize: 'clamp(4rem, 12vw, 13rem)', letterSpacing: '-0.02em' }}>Laman</span>
            <span className="block font-light" style={{ fontSize: 'clamp(4rem, 12vw, 13rem)', letterSpacing: '-0.02em' }}>Huseynli</span>
          </motion.h1>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }} className="hairline-gold my-8 origin-left" style={{ width: '100%' }} />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1 }} className={`font-body text-sm font-light max-w-xs leading-relaxed ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
            {t.hero.tagline}
          </motion.p>
          <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }} onClick={handleScroll} className="btn-primary self-start sm:self-auto">
            {t.hero.cta}
            <span className="block w-6 h-px bg-gold group-hover:bg-obsidian transition-colors" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 right-6 md:right-12 z-10 flex flex-col items-center gap-3">
        <span className={`writing-vertical font-body text-xs tracking-widest2 ${dark ? 'text-taupe-light/50' : 'text-taupe/50'}`}>{t.hero.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-10 bg-gold/40" />
      </motion.div>
    </section>
  )
}

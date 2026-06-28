import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function About({ dark, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className={`py-28 md:py-40 ${dark ? 'bg-obsidian' : 'bg-ivory'}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ duration: 0.6 }} className="section-label mb-16">
          {t.about.label}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="card-img aspect-[3/4]">
              <img src="PHOTO-2026-06-24-22-35-18.jpg" alt="Leman Hüseynli" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className={`absolute -bottom-4 -right-4 w-1/2 h-1/3 border ${dark ? 'border-gold/20' : 'border-gold/40'} -z-10`} />
            <div className="absolute -top-6 -left-6 z-10">
              <p className={`font-display text-8xl font-light italic leading-none ${dark ? 'text-gold/10' : 'text-gold/20'}`}>LH</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col justify-center pt-8 md:pt-0">
            <h2 className={`font-display font-light leading-tight mb-8 ${dark ? 'text-ivory' : 'text-obsidian'}`} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {t.about.heading1}<br /><span className="italic">{t.about.heading2}</span>
            </h2>

            <div className={`space-y-5 font-body text-sm leading-relaxed ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className={`grid grid-cols-3 gap-6 mt-12 pt-10 border-t ${dark ? 'border-white/8' : 'border-black/8'}`}>
              {[
                { value: '4', label: t.about.collections },
                { value: '2', label: t.about.awards },
                { value: '2', label: t.about.countries },
              ].map((m) => (
                <div key={m.label}>
                  <p className={`font-display text-3xl font-light ${dark ? 'text-ivory' : 'text-obsidian'}`}>{m.value}</p>
                  <p className={`font-body text-xs tracking-widest mt-1 ${dark ? 'text-taupe-light/60' : 'text-taupe/60'}`}>{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experiences } from '../data/projects.js'

export default function Experience({ dark, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className={`py-28 md:py-40 ${dark ? 'bg-obsidian' : 'bg-ivory'}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="section-label mb-4"
        >
          {t.education.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`font-display font-light mb-20 ${dark ? 'text-ivory' : 'text-obsidian'}`}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          {t.education.heading1}
          <span className="italic"> {t.education.heading2}</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px ${dark ? 'bg-white/8' : 'bg-black/8'} md:-translate-x-px`} />
          <div className="space-y-0">
            {experiences.map((exp, i) => {
              const entry = t.education.entries[i] || {}
              const isLeft = i % 2 === 0
              return (
                <TimelineItem
                  key={i}
                  exp={{ ...exp, ...entry }}
                  index={i}
                  isLeft={isLeft}
                  dark={dark}
                />
              )
            })}
          </div>
        </div>

        <SkillsGrid dark={dark} t={t} />
      </div>
    </section>
  )
}

function TimelineItem({ exp, index, isLeft, dark }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const content = (
    <div className={`pl-8 ${isLeft ? 'md:pl-0 md:pr-16' : 'md:pl-16'}`}>
      <p className={`font-body text-xs tracking-widest2 uppercase mb-2 ${dark ? 'text-taupe-light/50' : 'text-taupe/50'}`}>
        {exp.year}
      </p>
      <h3 className={`font-display text-xl font-light italic mb-1 ${dark ? 'text-ivory' : 'text-obsidian'}`}>
        {exp.role}
      </h3>
      <p className="text-gold font-body text-sm tracking-wider mb-1">{exp.company}</p>
      <p className={`font-body text-xs ${dark ? 'text-taupe-light/50' : 'text-taupe/50'} mb-4`}>{exp.location}</p>
      <p className={`font-body text-sm leading-relaxed ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
        {exp.description}
      </p>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative grid md:grid-cols-2 gap-0 pb-16`}
    >
      <div className={`absolute left-0 md:left-1/2 top-2 w-3 h-3 rounded-full border-2 border-gold bg-current -translate-x-1/2 ${dark ? 'text-obsidian' : 'text-ivory'}`} />
      {isLeft ? (<>{content}<div /></>) : (<><div />{content}</>)}
    </motion.div>
  )
}

function SkillsGrid({ dark, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={`mt-24 pt-16 border-t ${dark ? 'border-white/8' : 'border-black/8'}`}
    >
      <p className="section-label mb-10">{t.education.disciplines}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {t.education.skills.map((cat) => (
          <div key={cat.label}>
            <h4 className={`font-body text-xs tracking-widest uppercase mb-4 ${dark ? 'text-ivory/50' : 'text-obsidian/50'}`}>
              {cat.label}
            </h4>
            <ul className="space-y-2">
              {cat.items.map((skill) => (
                <li key={skill} className={`font-body text-sm ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

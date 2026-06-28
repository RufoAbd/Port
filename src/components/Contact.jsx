import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi'

export default function Contact({ dark, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setTimeout(() => { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }, 1400)
  }

  const inputClass = `w-full bg-transparent border-b pb-3 font-body text-sm outline-none transition-colors duration-300 placeholder-opacity-40 ${
    dark
      ? 'border-white/15 text-ivory placeholder:text-taupe-light/40 focus:border-gold'
      : 'border-black/15 text-obsidian placeholder:text-taupe/40 focus:border-gold'
  }`

  return (
    <section id="contact" className={`py-28 md:py-40 ${dark ? 'bg-obsidian-light' : 'bg-ivory-dark'}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.p ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">
          {t.contact.label}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className={`font-display font-light mb-20 ${dark ? 'text-ivory' : 'text-obsidian'}`} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {t.contact.heading1}<span className="italic"> {t.contact.heading2}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className={`font-body text-sm leading-relaxed mb-12 ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
              {t.contact.desc}
            </p>
            <div className="space-y-6">
              <a href="mailto:hsynlileman@gmail.com" className={`flex items-center justify-between group border-b pb-4 transition-colors duration-300 ${dark ? 'border-white/10 hover:border-gold/40' : 'border-black/10 hover:border-gold/40'}`}>
                <div className="flex items-center gap-4">
                  <FiMail size={16} className="text-gold" />
                  <span className={`font-body text-sm ${dark ? 'text-taupe-light' : 'text-taupe'}`}>hsynlileman@gmail.com</span>
                </div>
                <FiArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
              </a>
              <a href="https://www.linkedin.com/in/leman-huseynli" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between group border-b pb-4 transition-colors duration-300 ${dark ? 'border-white/10 hover:border-gold/40' : 'border-black/10 hover:border-gold/40'}`}>
  <div className="flex items-center gap-4">
    <FiLinkedin size={16} className="text-gold" />
    <span className={`font-body text-sm ${dark ? 'text-taupe-light' : 'text-taupe'}`}>Leman Hüseynli</span>
  </div>
  <FiArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
</a>
            </div>
            <div className={`mt-16 pt-10 border-t ${dark ? 'border-white/8' : 'border-black/8'}`}>
              <p className={`font-display text-xl font-light italic leading-relaxed ${dark ? 'text-ivory/40' : 'text-obsidian/30'}`}>
                "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street."
              </p>
              <p className={`font-body text-xs tracking-widest mt-3 ${dark ? 'text-taupe-light/30' : 'text-taupe/30'}`}>— Coco Chanel</p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            {status === 'sent' ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-start justify-center">
                <p className={`font-display text-3xl font-light italic mb-4 ${dark ? 'text-ivory' : 'text-obsidian'}`}>
                  {t.contact.sent}
                </p>
                <button onClick={() => setStatus(null)} className={`mt-8 font-body text-xs tracking-widest uppercase transition-opacity hover:opacity-60 ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
                  ↩
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label className={`font-body text-xs tracking-widest uppercase mb-3 block ${dark ? 'text-taupe-light/50' : 'text-taupe/50'}`}>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder={t.contact.namePlaceholder} className={inputClass} />
                </div>
                <div>
                  <label className={`font-body text-xs tracking-widest uppercase mb-3 block ${dark ? 'text-taupe-light/50' : 'text-taupe/50'}`}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t.contact.emailPlaceholder} className={inputClass} />
                </div>
                <div>
                  <label className={`font-body text-xs tracking-widest uppercase mb-3 block ${dark ? 'text-taupe-light/50' : 'text-taupe/50'}`}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t.contact.messagePlaceholder} className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" disabled={status === 'sending'} className="btn-primary">
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className={`max-w-screen-xl mx-auto px-6 md:px-12 mt-28 pt-10 border-t ${dark ? 'border-white/8' : 'border-black/8'} flex flex-col md:flex-row justify-between gap-4`}>
        <p className={`font-display font-light italic text-lg ${dark ? 'text-ivory/30' : 'text-obsidian/30'}`}>Huseynli Laman</p>
        <p className={`font-body text-xs ${dark ? 'text-taupe-light/30' : 'text-taupe/30'}`}>© {new Date().getFullYear()} Laman Studio. All rights reserved.</p>
      </div>
    </section>
  )
}

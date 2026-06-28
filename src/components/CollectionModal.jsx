import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function CollectionModal({ collection, dark, onClose }) {
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [imgIndex])

  const next = () => setImgIndex((i) => (i + 1) % collection.images.length)
  const prev = () => setImgIndex((i) => (i - 1 + collection.images.length) % collection.images.length)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className={`absolute inset-0 ${dark ? 'bg-obsidian/95' : 'bg-ivory/95'} backdrop-blur-sm`} />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-none ${
            dark ? 'bg-obsidian-light' : 'bg-ivory-dark'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-60 ${
              dark ? 'text-ivory' : 'text-obsidian'
            }`}
          >
            <FiX size={20} />
          </button>

          {/* Image — full width, tall */}
          <div className="relative overflow-hidden w-full" style={{ height: '65vh' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={collection.images[imgIndex]}
                alt={collection.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'contain' }}
                loading="lazy"
              />
            </AnimatePresence>

            {collection.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian/50 text-ivory flex items-center justify-center hover:bg-obsidian/80 transition-colors"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian/50 text-ivory flex items-center justify-center hover:bg-obsidian/80 transition-colors"
                >
                  <FiChevronRight size={18} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {collection.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === imgIndex ? 'bg-gold w-4' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info — below image */}
          <div className="p-10 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="section-label mb-4">{collection.season}</p>
              <h2
                className={`font-display font-light italic leading-tight mb-2 ${dark ? 'text-ivory' : 'text-obsidian'}`}
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {collection.name}
              </h2>
              <div className={`flex items-center gap-4 mb-6 font-body text-xs tracking-widest ${dark ? 'text-taupe-light/60' : 'text-taupe/60'}`}>
                <span>{collection.year}</span>
                <span>·</span>
                <span>{collection.category}</span>
              </div>

              <div className="hairline-gold mb-6" />

              <p className={`font-body text-sm leading-relaxed mb-6 ${dark ? 'text-taupe-light' : 'text-taupe'}`}>
                {collection.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {collection.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-body text-xs tracking-widest uppercase px-3 py-1.5 border ${
                      dark ? 'border-gold/20 text-gold/60' : 'border-gold/40 text-gold'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image counter */}
            <p className={`font-display text-5xl font-light shrink-0 ${dark ? 'text-white/10' : 'text-black/10'}`}>
              {String(imgIndex + 1).padStart(2, '0')} / {String(collection.images.length).padStart(2, '0')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
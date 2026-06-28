import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { collections } from '../data/projects.js'
import CollectionModal from './CollectionModal.jsx'

function CollectionCard({ item, tItem, index, dark, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onClick({ ...item, ...tItem })}
    >
      <div className="card-img relative overflow-hidden mb-5">
        <div className="aspect-[18/10]">
          <img
            src={item.coverImage}
            alt={tItem.name}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-all duration-500 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="font-body text-xs tracking-widest2 uppercase text-ivory border border-ivory/80 px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          >
            View
          </motion.span>
        </div>
        <span className={`absolute top-4 right-4 font-body text-xs tracking-widest ${dark ? 'text-taupe-light/60' : 'text-taupe/60'}`}>
          {item.year}
        </span>
      </div>

      <div className="space-y-1">
        <p className="section-label text-xs">{item.season}</p>
        <h3 className={`font-display font-light italic leading-tight ${dark ? 'text-ivory' : 'text-obsidian'}`} style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
          {tItem.name}
        </h3>
        <p className={`font-body text-xs tracking-wider ${dark ? 'text-taupe-light/50' : 'text-taupe/50'}`}>
          {tItem.category}
        </p>
      </div>
    </motion.article>
  )
}

export default function Collections({ dark, t }) {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="collections" className={`py-28 md:py-40 ${dark ? 'bg-obsidian-light' : 'bg-ivory-dark'}`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">
              {t.collections.label}
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className={`font-display font-light ${dark ? 'text-ivory' : 'text-obsidian'}`} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              {t.collections.heading}
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          {collections.map((item, i) => {
            const tItem = {
              name: t.collectionNames[item.id] || item.name,
              category: t.collectionCategories[item.id] || item.category,
              description: t.collectionDescriptions[item.id] || item.description,
            }
            return (
              <CollectionCard
                key={item.id}
                item={item}
                tItem={tItem}
                index={i}
                dark={dark}
                onClick={setSelected}
              />
            )
          })}
        </div>
      </div>

      {selected && (
        <CollectionModal
          collection={selected}
          dark={dark}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

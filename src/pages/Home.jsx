import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Collections from '../components/Collections.jsx'
import Experience from '../components/Experience.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({ dark, t }) {
  return (
    <main>
      <Hero dark={dark} t={t} />
      <About dark={dark} t={t} />
      <Collections dark={dark} t={t} />
      <Experience dark={dark} t={t} />
      <Contact dark={dark} t={t} />
    </main>
  )
}

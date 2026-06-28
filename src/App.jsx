import { useTheme } from './hooks/useTheme.js'
import { useLang } from './hooks/useLang.js'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  const { dark, toggle } = useTheme()
  const { lang, setLang, t } = useLang()

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-obsidian text-ivory' : 'bg-ivory text-obsidian'}`}>
      <Navbar dark={dark} onToggleTheme={toggle} lang={lang} setLang={setLang} t={t} />
      <Home dark={dark} t={t} />
    </div>
  )
}

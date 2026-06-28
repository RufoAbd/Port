import { useState } from 'react'
import { translations } from '../data/translations'

export function useLang() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  return { lang, setLang, t }
}

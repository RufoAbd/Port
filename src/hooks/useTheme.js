import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
  }, [dark])

  const toggle = () => setDark((d) => !d)

  return { dark, toggle }
}

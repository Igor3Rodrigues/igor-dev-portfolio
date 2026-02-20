import React, { useState, useEffect } from 'react'
import { Code, Menu, X } from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants'
import { useScrollSpy, scrollToSection } from '../../hooks/useScrollSpy'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id))

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = sectionId => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  const isActiveLang = lng => i18n.language?.startsWith(lng)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 w-full py-4 transition-all duration-300 ${
        isScrolled ? 'bg-black/30 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-330 mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Code className="w-6 h-6 text-primary" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent"
            >
              {PERSONAL_INFO.name.split(' ')[1]}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-base font-medium transition-colors ${
                  activeSection === link.id ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {t(link.labelKey)}
              </button>
            ))}
          </nav>

          {/* Desktop Right (CTA + Language) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-7 py-3.5 bg-white text-black rounded-xl"
            >
              {t('nav.hireMe')}
            </button>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActiveLang('en') ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
                aria-label="Change language to English"
              >
                EN
              </button>

              <button
                onClick={() => changeLanguage('pt')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActiveLang('pt') ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
                aria-label="Mudar idioma para Português"
              >
                PT
              </button>

              <button
                onClick={() => changeLanguage('es')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActiveLang('es') ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
                aria-label="Cambiar idioma a Español"
              >
                ES
              </button>
            </div>
          </div>

          {/* Mobile Right (Language + Menu Button) */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switch (outside menu) */}
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActiveLang('en') ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
                aria-label="Change language to English"
              >
                EN
              </button>

              <button
                onClick={() => changeLanguage('pt')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActiveLang('pt') ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
                aria-label="Mudar idioma para Português"
              >
                PT
              </button>

              <button
                onClick={() => changeLanguage('es')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActiveLang('es') ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                }`}
                aria-label="Cambiar idioma a Español"
              >
                ES
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-white"
              aria-label="menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (no language switch here) */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 px-6 py-6 space-y-3">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-4 py-3 text-white/70 hover:text-white transition-colors"
            >
              {t(link.labelKey)}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('contact')}
            className="w-full px-7 py-3.5 bg-white text-black rounded-xl mt-2"
          >
            {t('nav.hireMe')}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
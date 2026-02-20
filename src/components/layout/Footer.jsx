import React from 'react'
import { Github, Linkedin, Dribbble, Mail, MapPin, Heart } from 'lucide-react'
import { BsBehance, BsTwitterX, BsReddit } from 'react-icons/bs'
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: BsTwitterX,
    behance: BsBehance,
    dribbble: Dribbble,
    reddit: BsReddit,
  }

  return (
    <footer className="relative bg-black overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <FadeIn delay={0}>
            <div>
              <h3 className="text-3xl font-bold bg-linear-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-transparent mb-4">
                {PERSONAL_INFO.name.split('  ')[0]}
              </h3>

              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                {PERSONAL_INFO.taglineKey ? t(PERSONAL_INFO.taglineKey) : PERSONAL_INFO.tagline}
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {PERSONAL_INFO.email}
                  </span>
                </a>

                <div className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">{t('footer.quickLinks')}</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group flex items-center gap-2 text-white/60 hover:text-primary transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                      <span className="text-sm">{t(link.labelKey)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">{t('footer.connectTitle')}</h4>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                {t('footer.connectDesc')}
              </p>

              <div className="flex flex-wrap gap-3">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const Icon = socialIcons[platform]
                  return Icon ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:scale-110 transition-all duration-300"
                      aria-label={t('footer.socialAria', { platform })}
                    >
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors duration-300" />
                      <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/10 rounded-xl transition-all duration-300 pointer-events-none" />
                    </a>
                  ) : null
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} {PERSONAL_INFO.name}. {t('footer.rights')}
              </p>

              <p className="flex items-center gap-2 text-white/50 text-sm">
                {t('footer.builtWith')}{' '}
                <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />{' '}
                {t('footer.using')}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

export default Footer

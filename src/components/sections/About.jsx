import React from 'react'
import { Download, Code2, Sparkles } from 'lucide-react'
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
} from 'react-icons/si'
import { ABOUT_STATS, PERSONAL_INFO } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import RadialGradientBackground from './../backgrounds/RadialGradientBackground'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  // Skills (com chave de tradução)
  const skills = [
    { key: 'react', labelKey: 'about.skills.react', icon: SiReact },
    { key: 'next', labelKey: 'about.skills.next', icon: SiNextdotjs },
    { key: 'ts', labelKey: 'about.skills.typescript', icon: SiTypescript },
    { key: 'tailwind', labelKey: 'about.skills.tailwind', icon: SiTailwindcss },
    { key: 'node', labelKey: 'about.skills.node', icon: SiNodedotjs },
    { key: 'mongo', labelKey: 'about.skills.mongodb', icon: SiMongodb },
  ]

  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      <RadialGradientBackground variant="about" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <FadeIn delay={60}>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{t('about.badge')}</span>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight">
                  {t('about.title')}
                </h2>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex flex-col gap-4">
                  {(PERSONAL_INFO.bioKeys || []).map((key, index) => (
                    <p key={index} className="text-base text-white/70 leading-relaxed text-justify">
                      {t(key)}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={300}>
              <div className="grid grid-cols-3 gap-8">
                {ABOUT_STATS.map((stat, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary via-primary/50 to-primary/20 rounded-full"></div>
                    <div className="text-3xl font-normal text-white mb-2 font-mono">
                      {stat.value}
                    </div>
                    <p className="text-sm text-white/60 leading-snug">{t(stat.labelKey)}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <button
                onClick={() => window.open(PERSONAL_INFO.resume, '_blank')}
                className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black rounded-full px-8 py-4 text-base font-medium transition-all duration-300 group w-full sm:w-auto justify-center"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                {t('about.downloadResume')}
              </button>
            </FadeIn>
          </div>

          {/* Right Column - Info Grid */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {t('about.cards.expertise.title')}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed text-justify">
                        {t('about.cards.expertise.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group h-full">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t('about.cards.cleanCode.title')}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed text-justify">
                    {t('about.cards.cleanCode.desc')}
                  </p>
                </div>
              </div>

              <div className="relative group h-full">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t('about.cards.performance.title')}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed text-justify">
                    {t('about.cards.performance.desc')}
                  </p>
                </div>
              </div>

              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {t('about.metrics.items.satisfaction.value')}
                      </div>
                      <div className="text-xs text-white/60">
                        {t('about.metrics.items.satisfaction.label')}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {t('about.metrics.items.support.value')}
                      </div>
                      <div className="text-xs text-white/60">
                        {t('about.metrics.items.support.label')}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {t('about.metrics.items.delivery.value')}
                      </div>
                      <div className="text-xs text-white/60">
                        {t('about.metrics.items.delivery.label')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills Grid Section */}
        <FadeIn delay={500}>
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-normal text-white mb-2">{t('about.tech.title')}</h3>
              <p className="text-sm text-white/60">{t('about.tech.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
              {skills.map((skill, index) => (
                <div
                  key={skill.key || index}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
                >
                  <skill.icon className="text-3xl text-primary" />
                  <div className="text-sm text-white/80 font-medium text-center">
                    {t(skill.labelKey)}
                  </div>
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/10 rounded-2xl transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default About

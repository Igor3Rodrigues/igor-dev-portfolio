import React, { useState, useRef, useMemo } from 'react'
import { projects, categories } from '../../data/projects'
import {
  Briefcase,
  Target,
  Globe,
  Cloud,
  Layers,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import FadeIn from './../animations/FadeIn'
import ProjectCard from './../ui/ProjectCard'
import { useTranslation } from 'react-i18next'

const Projects = () => {
  const { t } = useTranslation()

  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(project => project.category === activeCategory)

  // Reset carousel when category changes
  const handleCategoryChange = category => {
    setActiveCategory(category)
    setCurrentIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const scrollToIndex = index => {
    setCurrentIndex(index)
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.offsetWidth / 3
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      })
    }
  }

  const nextSlide = () => {
    const maxIndex = Math.max(0, filteredProjects.length - 3)
    const newIndex = Math.min(currentIndex + 1, maxIndex)
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(newIndex)
  }

  // Category icons mapping (keep original category IDs from data)
  const categoryIcons = {
    All: Target,
    'Web Apps': Globe,
    'Mobile Apps': Smartphone,
    'SaaS Platforms': Cloud,
    'Full Stack': Layers,
  }

  // Translate category labels without changing category IDs used for filtering
  const categoryLabelMap = useMemo(
    () => ({
      All: t('projects.categories.all'),
      'Web Apps': t('projects.categories.web'),
      'Mobile Apps': t('projects.categories.mobile'),
      'SaaS Platforms': t('projects.categories.saas'),
      'Full Stack': t('projects.categories.fullstack'),
    }),
    [t]
  )

  return (
    <section id="projects" className="relative py-20 bg-black overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 w-96 h-96 bg-primary/10 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t('projects.badge')}</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              {t('projects.title')}
            </h2>

            <p className="text-lg text-white/60 max-w-2xl mx-auto">{t('projects.subtitle')}</p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(category => {
              const Icon = categoryIcons[category] || Target
              const label = categoryLabelMap[category] || category

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-primary/10 opacity-100'
                        : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                    }`}
                  />

                  <div className="relative flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </div>

                  {activeCategory === category && (
                    <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 z-10" />
                  )}
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Projects Carousel */}
        <FadeIn delay={200}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              <div className="flex gap-6 pb-4">
                {filteredProjects.map(project => (
                  <div
                    key={project.id}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrow */}
            {filteredProjects.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="
                    hidden lg:flex
                    group absolute -left-7 top-1/2 -translate-y-1/2
                    items-center justify-center
                    w-11 h-11 lg:w-14 lg:h-14
                    rounded-full
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    shadow-lg shadow-black/40
                    hover:bg-white/20
                    hover:scale-110
                    active:scale-95
                    transition-all duration-300
                    disabled:opacity-0 disabled:pointer-events-none
                    z-20
                  "
                  aria-label={t('projects.prev')}
                >
                  <ChevronLeft className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={currentIndex >= filteredProjects.length - 3}
                  className="
                    hidden lg:flex
                    group absolute -right-7 top-1/2 -translate-y-1/2
                    items-center justify-center
                    w-11 h-11 lg:w-14 lg:h-14
                    rounded-full
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    shadow-lg shadow-black/40
                    hover:bg-white/20
                    hover:scale-110
                    active:scale-95
                    transition-all duration-300
                    disabled:opacity-0 disabled:pointer-events-none
                    z-20
                  "
                  aria-label={t('projects.next')}
                >
                  <ChevronRight className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition" />
                </button>
              </>
            )}

            {/* Navigation Dots */}
            {filteredProjects.length > 3 && (
              <div className=" flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: Math.max(0, filteredProjects.length - 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentIndex
                          ? 'bg-primary w-6 h-2'
                          : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                      }`}
                      aria-label={t('projects.dotsAria', { index: index + 1 })}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Projects

import React from 'react'
import { ExternalLink, Github, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ProjectCard = ({ project }) => {
  const { t } = useTranslation()

  const {
    title,
    description,
    metrics,
    titleKey,
    descriptionKey,
    metricsKey,
    image,
    technologies,
    demoUrl,
    githubUrl,
    category,
  } = project

  // fallback: se ainda tiver projeto antigo com texto direto, não quebra
  const projectTitle = titleKey ? t(titleKey) : title
  const projectDesc = descriptionKey ? t(descriptionKey) : description
  const projectMetrics = metricsKey ? t(metricsKey) : metrics

  // categoria (mantém o filtro por ID e traduz só o label)
  const categoryLabelMap = {
    All: t('projects.categories.all'),
    'Web Apps': t('projects.categories.web'),
    'Mobile Apps': t('projects.categories.mobile'),
    'SaaS Platforms': t('projects.categories.saas'),
    'Full Stack': t('projects.categories.fullstack'),
  }

  const categoryLabel = categoryLabelMap[category] || category

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="relative h-64 overflow-hidden ">
        <img
          src={image}
          alt={projectTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-110"
              title={t('projectCard.viewDemo')}
              aria-label={t('projectCard.viewDemo')}
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-110"
              title={t('projectCard.viewCode')}
              aria-label={t('projectCard.viewCode')}
            >
              <Github className="w-4 h-4 text-white" />
            </a>
          )}
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#A8FF8D] transition-colors duration-300">
            {projectTitle}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{projectDesc}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {projectMetrics && (
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <p className="text-sm font-medium text-green-400">{projectMetrics}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard

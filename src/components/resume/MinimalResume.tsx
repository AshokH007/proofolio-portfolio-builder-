import React from 'react';
import type { PortfolioData, ResumeCustomization } from '../../types/portfolio';

interface Props {
  data: PortfolioData;
  customization: ResumeCustomization;
}

export const MinimalResume: React.FC<Props> = ({ data, customization }) => {
  const { profile, experience, education, skills, projects } = data;

  const headline = customization.headlineOverride || profile.title;
  const summary = customization.summaryOverride || profile.aboutLong || profile.bio;

  const sectionOrder = customization.sectionOrder || ['summary', 'experience', 'projects', 'skills', 'education'];
  const isVisible = (id: string) => customization.sectionVisibility?.[id as keyof typeof customization.sectionVisibility] ?? true;

  return (
    <div className="bg-white text-zinc-900 p-8 sm:p-12 font-sans text-[12px] leading-relaxed shadow-lg max-w-[210mm] min-h-[297mm] mx-auto select-text print:p-0 print:shadow-none print:max-w-none">
      
      {/* Header */}
      <header className="pb-6 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-light tracking-tight text-zinc-950 mb-1">
          {profile.name}
        </h1>
        {headline && (
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-3">
            {headline}
          </p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-600 font-light">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>{profile.location}</span>}
          {profile.website && <span>{profile.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-6">
        {sectionOrder.map((sectionId) => {
          if (!isVisible(sectionId)) return null;

          switch (sectionId) {
            case 'summary':
              if (!summary || !summary.trim()) return null;
              return (
                <section key="summary" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                    01 / Summary
                  </div>
                  <div className="md:col-span-3 text-zinc-800 leading-relaxed font-light">
                    {summary}
                  </div>
                </section>
              );

            case 'experience':
              if (!experience || experience.length === 0) return null;
              return (
                <section key="experience" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                    02 / Experience
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-medium text-zinc-900 text-[12.5px]">{exp.role}</span>
                          <span className="text-[11px] font-mono text-zinc-500">{exp.period}</span>
                        </div>
                        <div className="text-xs text-zinc-600 font-light">
                          {exp.company} {exp.location ? `— ${exp.location}` : ''}
                        </div>
                        {exp.description && (
                          <p className="text-zinc-700 font-light pt-0.5">{exp.description}</p>
                        )}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="space-y-0.5 pt-1 text-zinc-600 text-[11.5px] font-light">
                            {exp.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-zinc-400">—</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                    03 / Works
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-medium text-zinc-900">{proj.title}</span>
                          {proj.tags && proj.tags.length > 0 && (
                            <span className="text-[10px] font-mono text-zinc-400">
                              #{proj.tags.join(' #')}
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-600 font-light text-[11.5px]">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'skills':
              if (!skills || skills.length === 0) return null;
              return (
                <section key="skills" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                    04 / Skills
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    {skills.map((cat) => (
                      <div key={cat.id} className="text-xs">
                        <span className="font-medium text-zinc-900">{cat.name}: </span>
                        <span className="text-zinc-600 font-light">{cat.skills.map((s) => s.name).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                    05 / Education
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <span className="font-medium text-zinc-900">{edu.degree}</span>
                          <div className="text-[11px] text-zinc-500 font-light">{edu.institution}</div>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>

    </div>
  );
};

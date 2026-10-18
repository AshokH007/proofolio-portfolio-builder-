import React from 'react';
import type { PortfolioData, ResumeCustomization } from '../../types/portfolio';
import { getEffectiveAvatarUrl } from '../../types/portfolio';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface Props {
  data: PortfolioData;
  customization: ResumeCustomization;
}

export const ModernTechResume: React.FC<Props> = ({ data, customization }) => {
  const { profile, experience, education, skills, projects } = data;

  const headline = customization.headlineOverride || profile.title;
  const summary = customization.summaryOverride || profile.aboutLong || profile.bio;
  const accentColor = customization.accentColor || '#1e40af'; // Navy blue

  const sectionOrder = customization.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education'];
  const isVisible = (id: string) => customization.sectionVisibility?.[id as keyof typeof customization.sectionVisibility] ?? true;
  const avatar = getEffectiveAvatarUrl(profile);

  return (
    <div className="bg-white text-slate-800 p-8 sm:p-12 font-sans text-[12px] leading-relaxed shadow-lg max-w-[210mm] min-h-[297mm] mx-auto select-text print:p-0 print:shadow-none print:max-w-none">
      
      {/* Header */}
      <header className="flex items-start justify-between gap-6 border-b-2 pb-5 mb-6" style={{ borderColor: accentColor }}>
        <div className="space-y-1.5 flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: accentColor }}>
            {profile.name}
          </h1>
          {headline && (
            <p className="text-sm font-semibold text-slate-700">
              {headline}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
            {profile.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                {profile.email}
              </span>
            )}
            {profile.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {profile.phone}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {profile.location}
              </span>
            )}
            {profile.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                {profile.website.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>

        {customization.showPhoto && avatar && (
          <img
            src={avatar}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 shadow-sm"
            style={{ borderColor: accentColor }}
          />
        )}
      </header>

      {/* Sections */}
      <div className="space-y-5">
        {sectionOrder.map((sectionId) => {
          if (!isVisible(sectionId)) return null;

          switch (sectionId) {
            case 'summary':
              if (!summary || !summary.trim()) return null;
              return (
                <section key="summary" className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: accentColor }}>
                    <span>Executive Summary</span>
                    <span className="flex-1 h-[1px] bg-slate-200"></span>
                  </h2>
                  <p className="text-slate-700 leading-normal text-justify">
                    {summary}
                  </p>
                </section>
              );

            case 'skills':
              if (!skills || skills.length === 0) return null;
              return (
                <section key="skills" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: accentColor }}>
                    <span>Technical Stack &amp; Skills</span>
                    <span className="flex-1 h-[1px] bg-slate-200"></span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skills.map((cat) => (
                      <div key={cat.id} className="p-2 rounded bg-slate-50 border border-slate-100">
                        <strong className="block text-[11px] font-bold text-slate-800 mb-1">
                          {cat.name}
                        </strong>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.map((s) => (
                            <span key={s.id} className="text-[10.5px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'experience':
              if (!experience || experience.length === 0) return null;
              return (
                <section key="experience" className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: accentColor }}>
                    <span>Experience &amp; Career History</span>
                    <span className="flex-1 h-[1px] bg-slate-200"></span>
                  </h2>
                  <div className="space-y-3.5">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-slate-900 text-[12.5px]">
                            {exp.role} &bull; <span style={{ color: accentColor }}>{exp.company}</span>
                          </h3>
                          <span className="text-[11px] font-mono text-slate-500">{exp.period}</span>
                        </div>
                        {exp.location && <div className="text-[11px] text-slate-500">{exp.location}</div>}
                        {exp.description && <p className="text-slate-700 pt-0.5">{exp.description}</p>}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 pt-0.5 text-slate-700">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
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
                <section key="projects" className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: accentColor }}>
                    <span>Featured Projects</span>
                    <span className="flex-1 h-[1px] bg-slate-200"></span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-slate-900 text-[11.5px] flex items-center justify-between">
                            <span>{proj.title}</span>
                            {proj.featured && (
                              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-semibold">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2 pt-0.5">{proj.description}</p>
                          {proj.tags && proj.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.tags.map((t) => (
                                <span key={t} className="text-[9px] px-1 py-0.2 rounded bg-white border border-slate-200 text-slate-600 font-mono">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 pt-2 text-[10px] font-semibold" style={{ color: accentColor }}>
                          {proj.demoUrl && <span>Demo &rarr;</span>}
                          {proj.githubUrl && <span>Source &rarr;</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: accentColor }}>
                    <span>Education &amp; Credentials</span>
                    <span className="flex-1 h-[1px] bg-slate-200"></span>
                  </h2>
                  <div className="space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <strong className="text-slate-900 text-[11.5px]">{edu.degree}</strong>
                          <div className="text-[11px] text-slate-600">{edu.institution} {edu.details ? `— ${edu.details}` : ''}</div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">{edu.period}</span>
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

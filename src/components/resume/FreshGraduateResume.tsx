import React from 'react';
import type { PortfolioData, ResumeCustomization } from '../../types/portfolio';
import { GraduationCap, Code, Briefcase } from 'lucide-react';

interface Props {
  data: PortfolioData;
  customization: ResumeCustomization;
}

export const FreshGraduateResume: React.FC<Props> = ({ data, customization }) => {
  const { profile, experience, education, skills, projects } = data;

  const headline = customization.headlineOverride || profile.title || 'Aspiring Software Engineer';
  const summary = customization.summaryOverride || profile.aboutLong || profile.bio;

  // Fresh Graduate defaults: Education -> Projects -> Skills -> Experience
  const sectionOrder = customization.sectionOrder || ['education', 'projects', 'skills', 'experience'];
  const isVisible = (id: string) => customization.sectionVisibility?.[id as keyof typeof customization.sectionVisibility] ?? true;

  return (
    <div className="bg-white text-slate-800 p-8 sm:p-12 font-sans text-[12px] leading-relaxed shadow-lg max-w-[210mm] min-h-[297mm] mx-auto select-text print:p-0 print:shadow-none print:max-w-none">
      
      {/* Header */}
      <header className="text-center border-b pb-5 mb-5 border-emerald-600">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          {profile.name}
        </h1>
        <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 mb-2">
          {headline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>• {profile.phone}</span>}
          {profile.location && <span>• {profile.location}</span>}
          {profile.website && <span>• {profile.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary if present */}
      {summary && summary.trim() && isVisible('summary') && (
        <section className="mb-5 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-slate-700">
          <p className="text-[11.5px] leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Sections */}
      <div className="space-y-5">
        {sectionOrder.map((sectionId) => {
          if (!isVisible(sectionId)) return null;

          switch (sectionId) {
            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Education &amp; Academic Honors</span>
                  </h2>
                  <div className="space-y-2.5">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline">
                          <strong className="text-slate-900 text-[12px]">{edu.degree}</strong>
                          <span className="text-[11px] font-mono text-emerald-700 font-semibold">{edu.period}</span>
                        </div>
                        <div className="text-[11.5px] text-slate-600 font-medium">{edu.institution}</div>
                        {edu.details && (
                          <p className="text-[11px] text-slate-600 pt-0.5">{edu.details}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="space-y-2.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <Code className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Academic &amp; Independent Projects</span>
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1 p-2 rounded bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-baseline">
                          <strong className="text-slate-900 text-[12px]">{proj.title}</strong>
                          {proj.tags && proj.tags.length > 0 && (
                            <span className="text-[10px] text-emerald-700 font-mono">[{proj.tags.join(', ')}]</span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-slate-700">{proj.description}</p>
                        <div className="flex gap-4 text-[10.5px] font-semibold text-emerald-600 pt-0.5">
                          {proj.demoUrl && <span>Demo &rarr;</span>}
                          {proj.githubUrl && <span>GitHub &rarr;</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'skills':
              if (!skills || skills.length === 0) return null;
              return (
                <section key="skills" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <span>Technical Capabilities</span>
                  </h2>
                  <div className="space-y-1.5 text-xs text-slate-800">
                    {skills.map((cat) => (
                      <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <strong className="text-slate-900 min-w-[130px]">{cat.name}:</strong>
                        <span className="text-slate-600">{cat.skills.map((s) => s.name).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'experience':
              if (!experience || experience.length === 0) return null;
              return (
                <section key="experience" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Work Experience &amp; Internships</span>
                  </h2>
                  <div className="space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline">
                          <strong className="text-slate-900 text-[12px]">{exp.role}</strong>
                          <span className="text-[11px] font-mono text-slate-500">{exp.period}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                        {exp.description && <p className="text-slate-700 pt-0.5">{exp.description}</p>}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 pt-0.5 text-slate-600 text-[11px]">
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

            default:
              return null;
          }
        })}
      </div>

    </div>
  );
};

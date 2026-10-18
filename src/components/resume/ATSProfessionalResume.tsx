import React from 'react';
import type { PortfolioData, ResumeCustomization } from '../../types/portfolio';

interface Props {
  data: PortfolioData;
  customization: ResumeCustomization;
}

export const ATSProfessionalResume: React.FC<Props> = ({ data, customization }) => {
  const { profile, experience, education, skills, projects } = data;

  const headline = customization.headlineOverride || profile.title;
  const summary = customization.summaryOverride || profile.aboutLong || profile.bio;

  const sectionOrder = customization.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];
  const isVisible = (id: string) => customization.sectionVisibility?.[id as keyof typeof customization.sectionVisibility] ?? true;

  return (
    <div className="bg-white text-black p-8 sm:p-12 font-serif text-[13px] leading-relaxed shadow-lg max-w-[210mm] min-h-[297mm] mx-auto select-text print:p-0 print:shadow-none print:max-w-none">
      
      {/* Header */}
      <header className="text-center border-b border-black pb-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-black mb-1">
          {profile.name}
        </h1>
        {headline && (
          <p className="text-sm font-sans font-medium text-gray-800 mb-2">
            {headline}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-700 font-sans">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>• {profile.phone}</span>}
          {profile.location && <span>• {profile.location}</span>}
          {profile.website && <span>• {profile.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Dynamic Sections */}
      <div className="space-y-6">
        {sectionOrder.map((sectionId) => {
          if (!isVisible(sectionId)) return null;

          switch (sectionId) {
            case 'summary':
              if (!summary || !summary.trim()) return null;
              return (
                <section key="summary" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 font-sans">
                    Professional Summary
                  </h2>
                  <p className="text-justify text-gray-900 leading-normal">
                    {summary}
                  </p>
                </section>
              );

            case 'experience':
              if (!experience || experience.length === 0) return null;
              return (
                <section key="experience" className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 font-sans">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold text-sm text-black">{exp.role}</span>
                          <span className="font-sans text-gray-700">{exp.period}</span>
                        </div>
                        <div className="text-xs italic text-gray-800">
                          {exp.company} {exp.location ? `• ${exp.location}` : ''}
                        </div>
                        {exp.description && (
                          <p className="text-gray-900 pt-0.5">{exp.description}</p>
                        )}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 pt-1 text-gray-800">
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

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 font-sans">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold text-sm text-black">{edu.degree}</span>
                          <span className="font-sans text-gray-700">{edu.period}</span>
                        </div>
                        <div className="text-xs italic text-gray-800">{edu.institution}</div>
                        {edu.details && <p className="text-xs text-gray-700">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'skills':
              if (!skills || skills.length === 0) return null;
              return (
                <section key="skills" className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 font-sans">
                    Technical Skills
                  </h2>
                  <div className="space-y-1.5 text-xs text-gray-900">
                    {skills.map((cat) => (
                      <div key={cat.id}>
                        <strong className="font-sans font-semibold">{cat.name}: </strong>
                        <span>{cat.skills.map((s) => s.name).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 font-sans">
                    Selected Projects
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1 text-xs">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-sm text-black">{proj.title}</span>
                          {proj.tags && proj.tags.length > 0 && (
                            <span className="font-sans text-gray-600">[{proj.tags.join(', ')}]</span>
                          )}
                        </div>
                        <p className="text-gray-900">{proj.description}</p>
                        <div className="flex gap-4 font-sans text-[11px] text-gray-700 pt-0.5">
                          {proj.demoUrl && <span>Demo: {proj.demoUrl}</span>}
                          {proj.githubUrl && <span>Code: {proj.githubUrl}</span>}
                        </div>
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

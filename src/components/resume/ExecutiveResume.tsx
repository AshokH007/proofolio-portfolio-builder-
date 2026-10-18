import React from 'react';
import type { PortfolioData, ResumeCustomization } from '../../types/portfolio';
import { getEffectiveAvatarUrl } from '../../types/portfolio';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface Props {
  data: PortfolioData;
  customization: ResumeCustomization;
}

export const ExecutiveResume: React.FC<Props> = ({ data, customization }) => {
  const { profile, experience, education, skills, projects } = data;

  const headline = customization.headlineOverride || profile.title;
  const summary = customization.summaryOverride || profile.aboutLong || profile.bio;
  const accentColor = customization.accentColor || '#0f172a'; // Slate-900

  const avatar = getEffectiveAvatarUrl(profile);
  const isVisible = (id: string) => customization.sectionVisibility?.[id as keyof typeof customization.sectionVisibility] ?? true;

  return (
    <div className="bg-white text-slate-800 p-8 font-sans text-[11.5px] leading-relaxed shadow-lg max-w-[210mm] min-h-[297mm] mx-auto select-text print:p-0 print:shadow-none print:max-w-none">
      
      {/* Top Banner */}
      <header className="border-b pb-5 mb-6 flex items-start justify-between gap-6" style={{ borderColor: accentColor }}>
        <div className="space-y-1 flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {profile.name}
          </h1>
          {headline && (
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {headline}
            </p>
          )}
        </div>

        {customization.showPhoto && avatar && (
          <img
            src={avatar}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-sm flex-shrink-0"
            style={{ borderColor: accentColor }}
          />
        )}
      </header>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column (Sidebar: Contact, Core Competencies, Education) */}
        <div className="space-y-5 border-r md:pr-5 border-slate-200">
          
          {/* Contact Details */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Contact &bull; Channels
            </h3>
            <div className="space-y-1.5 text-[11px] text-slate-600 break-words">
              {profile.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{profile.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Core Competencies / Skills */}
          {skills && skills.length > 0 && isVisible('skills') && (
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Executive Competencies
              </h3>
              <div className="space-y-2.5">
                {skills.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <strong className="block text-[10.5px] font-bold text-slate-800 uppercase tracking-wide">
                      {cat.name}
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s) => (
                        <span key={s.id} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Credentials */}
          {education && education.length > 0 && isVisible('education') && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Credentials &amp; Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <strong className="block text-slate-900 text-[11px] leading-snug">{edu.degree}</strong>
                    <div className="text-[10.5px] text-slate-600">{edu.institution}</div>
                    <span className="text-[10px] font-mono text-slate-400 block">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Executive Summary, Leadership Experience, Initiatives) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Executive Summary */}
          {summary && summary.trim() && isVisible('summary') && (
            <section className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Executive Profile
              </h2>
              <p className="text-slate-700 leading-normal text-justify text-[11.5px]">
                {summary}
              </p>
            </section>
          )}

          {/* Experience & Leadership */}
          {experience && experience.length > 0 && isVisible('experience') && (
            <section className="space-y-3.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Leadership &amp; Career History
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-[12px]">
                        {exp.role} &bull; <span className="font-semibold text-slate-700">{exp.company}</span>
                      </h3>
                      <span className="text-[10.5px] font-mono text-slate-500">{exp.period}</span>
                    </div>
                    {exp.location && <div className="text-[10.5px] text-slate-500">{exp.location}</div>}
                    {exp.description && <p className="text-slate-700 pt-0.5">{exp.description}</p>}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 pt-1 text-slate-700 text-[11px]">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects / Key Initiatives */}
          {projects && projects.length > 0 && isVisible('projects') && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Strategic Initiatives &amp; Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-slate-900 text-[11.5px]">{proj.title}</strong>
                      {proj.tags && proj.tags.length > 0 && (
                        <span className="text-[10px] text-slate-500 font-mono">[{proj.tags.join(', ')}]</span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>

    </div>
  );
};

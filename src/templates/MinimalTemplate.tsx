import type { PortfolioData } from '../types/portfolio';
import { getEffectiveAvatarUrl, getEffectiveProjectImageUrl } from '../types/portfolio';
import { ExternalLink, Mail, MapPin, Globe } from 'lucide-react';
import { GithubIcon } from '../components/common/Icons';

interface Props {
  data: PortfolioData;
}

export const MinimalTemplate: React.FC<Props> = ({ data }) => {
  const { profile, projects, experience, skills, education, contact, theme, sections } = data;

  const fontClass = theme.fontFamily === 'Playfair Display' 
    ? 'font-serif' 
    : theme.fontFamily === 'JetBrains Mono' 
    ? 'font-mono' 
    : 'font-sans';

  return (
    <div 
      className={`min-h-full transition-colors duration-200 ${fontClass}`}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-20">
        
        {/* Render according to section ordering */}
        {sections.map((section) => {
          if (!section.visible) return null;

          switch (section.id) {
            case 'hero':
              return (
                <header key="hero" className="border-b border-white/10 pb-16">
                  {profile.statusBadge && (
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-6 border"
                      style={{ borderColor: `${theme.accentColor}40`, color: theme.accentColor }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {profile.statusBadge}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-8 items-start justify-between">
                    <div className="space-y-4 max-w-2xl">
                      <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
                        {profile.name}
                      </h1>
                      <p className="text-xl font-normal text-white/70">
                        {profile.title}
                      </p>
                      <p className="text-base text-white/60 leading-relaxed font-light">
                        {profile.tagline || profile.bio}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4 text-sm text-white/60">
                        {profile.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-white/40" />
                            {profile.location}
                          </span>
                        )}
                        {profile.email && (
                          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Mail className="w-4 h-4 text-white/40" />
                            {profile.email}
                          </a>
                        )}
                        {profile.website && (
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Globe className="w-4 h-4 text-white/40" />
                            {profile.website.replace(/^https?:\/\//, '')}
                          </a>
                        )}
                      </div>
                    </div>

                    {getEffectiveAvatarUrl(profile) && (
                      <img 
                        src={getEffectiveAvatarUrl(profile)} 
                        alt={profile.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-white/20 filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    )}
                  </div>

                  {profile.socialLinks && profile.socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/5">
                      {profile.socialLinks.map((link) => (
                        <a 
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors"
                        >
                          {link.label || link.platform} &rarr;
                        </a>
                      ))}
                    </div>
                  )}
                </header>
              );

            case 'about':
              return (
                <section key="about" className="space-y-6">
                  <h2 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                    01. About
                  </h2>
                  <div className="text-lg text-white/80 font-light leading-relaxed space-y-4">
                    <p>{profile.aboutLong || profile.bio}</p>
                  </div>
                </section>
              );

            case 'projects':
              return (
                <section key="projects" className="space-y-8">
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-3">
                    <h2 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                      02. Selected Works
                    </h2>
                    <span className="text-xs text-white/40">{projects.length} Projects</span>
                  </div>

                  <div className="divide-y divide-white/10">
                    {projects.map((proj) => (
                      <div key={proj.id} className="py-8 group transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="space-y-2 max-w-xl">
                            {getEffectiveProjectImageUrl(proj) && (
                              <div className="rounded-lg overflow-hidden h-36 mb-3 border border-white/10 max-w-sm">
                                <img
                                  src={getEffectiveProjectImageUrl(proj)}
                                  alt={proj.title}
                                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-normal text-white group-hover:text-sky-300 transition-colors">
                                {proj.title}
                              </h3>
                              {proj.featured && (
                                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white/20 text-white/60 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed font-light">
                              {proj.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {proj.tags.map((t) => (
                                <span key={t} className="text-xs font-mono text-white/40">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-2 text-sm">
                            {proj.demoUrl && (
                              <a 
                                href={proj.demoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                              >
                                <span>Demo</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a 
                                href={proj.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'experience':
              return (
                <section key="experience" className="space-y-8">
                  <div className="border-b border-white/10 pb-3">
                    <h2 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                      03. Experience
                    </h2>
                  </div>

                  <div className="space-y-10">
                    {experience.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-xs font-mono text-white/40">
                          {exp.period}
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <h3 className="text-base font-medium text-white">
                            {exp.role} &mdash; <span className="text-white/60 font-normal">{exp.company}</span>
                          </h3>
                          <p className="text-sm text-white/60 font-light leading-relaxed">
                            {exp.description}
                          </p>
                          {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="list-disc list-inside text-xs text-white/50 space-y-1 pt-2 font-light">
                              {exp.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'skills':
              return (
                <section key="skills" className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h2 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                      04. Capabilities
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {skills.map((cat) => (
                      <div key={cat.id} className="space-y-3">
                        <h3 className="text-xs font-mono text-white/50 uppercase tracking-wider">
                          {cat.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((sk) => (
                            <span 
                              key={sk.id}
                              className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded text-white/80 font-light"
                            >
                              {sk.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              return (
                <section key="education" className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h2 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                      05. Credentials
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2">
                        <div>
                          <h3 className="text-base font-medium text-white">{edu.degree}</h3>
                          <p className="text-sm text-white/60">{edu.institution}</p>
                          {edu.details && <p className="text-xs text-white/40 mt-1">{edu.details}</p>}
                        </div>
                        <span className="text-xs font-mono text-white/40">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'contact':
              return (
                <footer key="contact" className="pt-12 border-t border-white/10 space-y-6">
                  <h2 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                    06. Inquiries
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-light text-white">
                      {contact.heading || "Let's work together."}
                    </h3>
                    <p className="text-base text-white/60 max-w-xl font-light">
                      {contact.subheading}
                    </p>
                    <div className="pt-4">
                      <a 
                        href={contact.ctaUrl || `mailto:${contact.email}`}
                        className="inline-block text-base border-b border-white pb-1 text-white hover:text-sky-300 hover:border-sky-300 transition-colors"
                      >
                        {contact.ctaText || 'Get in Touch'} &rarr;
                      </a>
                    </div>
                  </div>
                </footer>
              );

            default:
              return null;
          }
        })}

      </div>
    </div>
  );
};

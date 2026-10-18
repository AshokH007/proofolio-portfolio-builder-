import type { PortfolioData } from '../types/portfolio';
import { getEffectiveAvatarUrl, getEffectiveProjectImageUrl } from '../types/portfolio';
import { ExternalLink, Mail, MapPin, Globe, Sparkles, Briefcase, GraduationCap, Code } from 'lucide-react';
import { GithubIcon } from '../components/common/Icons';

interface Props {
  data: PortfolioData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { profile, projects, experience, skills, education, contact, theme, sections } = data;

  const radiusMap: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-3xl',
  };
  const roundedClass = radiusMap[theme.borderRadius] || 'rounded-xl';

  return (
    <div 
      className="min-h-full font-sans transition-colors duration-200"
      style={{
        backgroundColor: theme.backgroundColor || '#030712',
        color: theme.textColor || '#f9fafb',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20 space-y-20">

        {/* Dynamic section rendering */}
        {sections.map((section) => {
          if (!section.visible) return null;

          switch (section.id) {
            case 'hero':
              return (
                <div key="hero" className="space-y-8">
                  {/* Hero Bento Box */}
                  <div 
                    className={`p-8 sm:p-12 ${roundedClass} border border-white/10 relative overflow-hidden backdrop-blur-xl shadow-2xl`}
                    style={{ backgroundColor: `${theme.surfaceColor}90` }}
                  >
                    {/* Ambient glow in background */}
                    <div 
                      className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ backgroundColor: theme.primaryColor }}
                    ></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                      <div className="space-y-5 max-w-2xl">
                        {profile.statusBadge && (
                          <div 
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-sm"
                            style={{ 
                              backgroundColor: `${theme.primaryColor}15`, 
                              borderColor: `${theme.accentColor}40`,
                              color: theme.accentColor
                            }}
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{profile.statusBadge}</span>
                          </div>
                        )}

                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                          {profile.name}
                        </h1>

                        <p 
                          className="text-xl sm:text-2xl font-semibold"
                          style={{ color: theme.accentColor }}
                        >
                          {profile.title}
                        </p>

                        <p className="text-base sm:text-lg text-white/75 leading-relaxed font-normal">
                          {profile.tagline || profile.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                          <a 
                            href={contact.ctaUrl || `mailto:${contact.email}`}
                            className={`px-6 py-3 ${roundedClass} text-white font-semibold text-sm shadow-lg hover:brightness-110 transition-all flex items-center gap-2`}
                            style={{ backgroundColor: theme.primaryColor }}
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>{contact.ctaText || 'Get in Touch'}</span>
                          </a>
                          {profile.resumeUrl && (
                            <a 
                              href={profile.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-6 py-3 ${roundedClass} border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all`}
                            >
                              Download Resume
                            </a>
                          )}
                        </div>
                      </div>

                      {getEffectiveAvatarUrl(profile) && (
                        <div className="flex-shrink-0">
                          <img 
                            src={getEffectiveAvatarUrl(profile)} 
                            alt={profile.name}
                            className={`w-32 h-32 sm:w-40 sm:h-40 ${roundedClass} object-cover border-2 shadow-xl`}
                            style={{ borderColor: `${theme.accentColor}50` }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-white/60">
                      <div className="flex flex-wrap gap-5">
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

                      {profile.socialLinks && profile.socialLinks.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {profile.socialLinks.map((sl) => (
                            <a
                              key={sl.id}
                              href={sl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              {sl.label || sl.platform}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

            case 'about':
              return (
                <div key="about" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/50">Overview</span>
                  </div>
                  <div 
                    className={`p-8 ${roundedClass} border border-white/10 backdrop-blur`}
                    style={{ backgroundColor: `${theme.surfaceColor}70` }}
                  >
                    <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                      {profile.aboutLong || profile.bio}
                    </p>
                  </div>
                </div>
              );

            case 'projects':
              return (
                <div key="projects" className="space-y-6">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accentColor }}></span>
                      <h2 className="text-2xl font-bold text-white tracking-tight">Featured Projects</h2>
                    </div>
                    <span className="text-xs text-white/50">{projects.length} Works</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id}
                        className={`group p-6 ${roundedClass} border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between`}
                        style={{ backgroundColor: `${theme.surfaceColor}80` }}
                      >
                        <div className="space-y-4">
                          {getEffectiveProjectImageUrl(proj) ? (
                            <div className="overflow-hidden rounded-lg h-44 bg-slate-900 border border-white/5">
                              <img 
                                src={getEffectiveProjectImageUrl(proj)} 
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                              />
                            </div>
                          ) : (
                            <div className="h-28 rounded-lg bg-gradient-to-r from-sky-950/40 to-slate-900/60 border border-white/5 flex items-center justify-between px-4 text-xs text-white/40">
                              <span className="font-mono">{proj.tags[0] ? `#${proj.tags[0]}` : 'Project'}</span>
                              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5">Repository</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                              {proj.title}
                            </h3>
                            {proj.featured && (
                              <span 
                                className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                                style={{ 
                                  backgroundColor: `${theme.primaryColor}20`,
                                  borderColor: `${theme.primaryColor}40`,
                                  color: theme.accentColor
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-white/70 leading-relaxed">
                            {proj.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {proj.tags.map((t) => (
                              <span 
                                key={t} 
                                className="text-xs px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-5 mt-4 border-t border-white/5 text-xs font-semibold">
                          {proj.demoUrl && (
                            <a 
                              href={proj.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 hover:underline"
                              style={{ color: theme.accentColor }}
                            >
                              <span>Live Preview</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a 
                              href={proj.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                              <span>Source</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'experience':
              return (
                <div key="experience" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-sky-400" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Work Experience</h2>
                  </div>

                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div 
                        key={exp.id}
                        className={`p-6 ${roundedClass} border border-white/10 space-y-3`}
                        style={{ backgroundColor: `${theme.surfaceColor}70` }}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                          <h3 className="text-lg font-bold text-white">
                            {exp.role} &bull; <span style={{ color: theme.accentColor }}>{exp.company}</span>
                          </h3>
                          <span className="text-xs text-white/50 font-mono">{exp.period}</span>
                        </div>
                        <p className="text-xs text-white/40">{exp.location}</p>
                        <p className="text-sm text-white/75 leading-relaxed">
                          {exp.description}
                        </p>
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="text-xs text-white/60 space-y-1 pt-1 list-disc list-inside">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'skills':
              return (
                <div key="skills" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-sky-400" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Skills &amp; Technologies</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((cat) => (
                      <div 
                        key={cat.id}
                        className={`p-6 ${roundedClass} border border-white/10 space-y-4`}
                        style={{ backgroundColor: `${theme.surfaceColor}60` }}
                      >
                        <h4 className="text-sm font-bold tracking-wider uppercase" style={{ color: theme.accentColor }}>
                          {cat.name}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((sk) => (
                            <div 
                              key={sk.id}
                              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90 flex items-center justify-between gap-2"
                            >
                              <span>{sk.name}</span>
                              {sk.level && (
                                <span className="text-[10px] text-white/40">{sk.level}%</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'education':
              return (
                <div key="education" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-400" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Education</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {education.map((edu) => (
                      <div 
                        key={edu.id}
                        className={`p-6 ${roundedClass} border border-white/10 space-y-1.5`}
                        style={{ backgroundColor: `${theme.surfaceColor}60` }}
                      >
                        <span className="text-xs text-white/50 font-mono">{edu.period}</span>
                        <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                        <p className="text-sm" style={{ color: theme.accentColor }}>{edu.institution}</p>
                        {edu.details && <p className="text-xs text-white/60 pt-1">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'contact':
              return (
                <div 
                  key="contact"
                  className={`p-8 sm:p-12 ${roundedClass} border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden`}
                  style={{ backgroundColor: `${theme.surfaceColor}90` }}
                >
                  <div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${theme.primaryColor}, transparent 70%)` }}
                  ></div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
                    {contact.heading || "Let's connect and build."}
                  </h3>
                  <p className="text-base text-white/70 max-w-xl mx-auto leading-relaxed relative z-10">
                    {contact.subheading}
                  </p>
                  <div className="pt-2 relative z-10">
                    <a 
                      href={contact.ctaUrl || `mailto:${contact.email}`}
                      className={`inline-block px-8 py-3.5 ${roundedClass} text-white font-bold text-sm shadow-xl hover:brightness-110 transition-all`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {contact.ctaText || 'Get in Touch'}
                    </a>
                  </div>
                  {contact.availabilityNote && (
                    <p className="text-xs text-white/50 relative z-10">
                      {contact.availabilityNote}
                    </p>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}

        <footer className="text-center text-xs text-white/40 pt-8 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} {profile.name} &bull; Generated with Prooffolio</p>
        </footer>

      </div>
    </div>
  );
};

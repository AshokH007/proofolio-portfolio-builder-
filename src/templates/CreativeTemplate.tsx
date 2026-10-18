import type { PortfolioData } from '../types/portfolio';
import { getEffectiveAvatarUrl, getEffectiveProjectImageUrl } from '../types/portfolio';
import { Sparkles, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { GithubIcon } from '../components/common/Icons';

interface Props {
  data: PortfolioData;
}

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { profile, projects, experience, skills, education, contact, theme, sections } = data;

  return (
    <div 
      className="min-h-full font-creative transition-colors duration-200"
      style={{
        backgroundColor: theme.backgroundColor || '#18070d',
        color: theme.textColor || '#fff1f2',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-24">

        {/* Hero Section */}
        {sections.map((section) => {
          if (!section.visible) return null;

          switch (section.id) {
            case 'hero':
              return (
                <div key="hero" className="space-y-12">
                  <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
                    <div className="space-y-6 max-w-2xl">
                      {profile.statusBadge && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase">
                          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                          <span>{profile.statusBadge}</span>
                        </div>
                      )}

                      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
                        {profile.name}
                      </h1>

                      <p className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                        {profile.title}
                      </p>

                      <p className="text-lg text-rose-100/80 leading-relaxed font-normal">
                        {profile.tagline || profile.bio}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <a 
                          href={contact.ctaUrl || `mailto:${contact.email}`}
                          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all"
                        >
                          {contact.ctaText || "Let's Collaborate"}
                        </a>
                        {profile.resumeUrl && (
                          <a 
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 rounded-full border border-rose-500/30 text-white font-semibold text-sm hover:bg-rose-500/10 transition-all"
                          >
                            Download CV
                          </a>
                        )}
                      </div>
                    </div>

                    {getEffectiveAvatarUrl(profile) && (
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                        <img 
                          src={getEffectiveAvatarUrl(profile)} 
                          alt={profile.name}
                          className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl object-cover border-2 border-white/20 shadow-2xl" 
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-rose-500/20 text-sm text-rose-200/70">
                    <div className="flex flex-wrap gap-6">
                      {profile.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-rose-400" />
                          {profile.location}
                        </span>
                      )}
                      {profile.email && (
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                          <Mail className="w-4 h-4 text-rose-400" />
                          {profile.email}
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
                            className="px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200 hover:border-rose-400 transition-all"
                          >
                            {sl.label || sl.platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );

            case 'about':
              return (
                <div key="about" className="space-y-6">
                  <div className="inline-block text-xs uppercase tracking-widest text-rose-400 font-bold">
                    // The Narrative
                  </div>
                  <div className="p-8 sm:p-10 rounded-3xl bg-rose-950/30 border border-rose-500/20 backdrop-blur space-y-4">
                    <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed">
                      {profile.aboutLong || profile.bio}
                    </p>
                  </div>
                </div>
              );

            case 'projects':
              return (
                <div key="projects" className="space-y-8">
                  <div className="flex justify-between items-end border-b border-rose-500/20 pb-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-rose-400 font-bold block mb-1">
                        Portfolio
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Curated Works
                      </h2>
                    </div>
                    <span className="text-rose-300/60 text-sm">{projects.length} Works</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id}
                        className="group rounded-3xl overflow-hidden bg-rose-950/30 border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {getEffectiveProjectImageUrl(proj) ? (
                            <div className="relative overflow-hidden h-56">
                              <img 
                                src={getEffectiveProjectImageUrl(proj)} 
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              {proj.featured && (
                                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-lg">
                                  Featured
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="h-32 bg-gradient-to-br from-rose-950/60 to-purple-950/40 p-5 flex items-center justify-between border-b border-rose-500/10">
                              <span className="text-sm font-bold text-rose-300"># {proj.tags[0] || 'Creative Work'}</span>
                              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300">Showcase</span>
                            </div>
                          )}
                          <div className="p-6 space-y-3">
                            <h3 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                              {proj.title}
                            </h3>
                            <p className="text-sm text-rose-100/70 leading-relaxed font-sans">
                              {proj.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {proj.tags.map((t) => (
                                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 pt-0 flex items-center gap-4 text-sm font-semibold">
                          {proj.demoUrl && (
                            <a 
                              href={proj.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-rose-400 hover:text-white transition-colors"
                            >
                              <span>Explore Project</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a 
                              href={proj.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-rose-200/60 hover:text-white transition-colors"
                            >
                              <GithubIcon className="w-4 h-4" />
                              <span>Code</span>
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
                <div key="experience" className="space-y-8">
                  <div className="border-b border-rose-500/20 pb-4">
                    <span className="text-xs uppercase tracking-widest text-rose-400 font-bold block mb-1">
                      Journey
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      Experience &amp; Leadership
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div 
                        key={exp.id}
                        className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/20 hover:bg-rose-950/30 transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2">
                          <h3 className="text-xl font-bold text-white">
                            {exp.role} <span className="text-rose-400 font-normal">@ {exp.company}</span>
                          </h3>
                          <span className="text-xs font-semibold text-rose-300/80 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 self-start sm:self-auto">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm text-rose-100/75 font-sans leading-relaxed">
                          {exp.description}
                        </p>
                        {exp.highlights && exp.highlights.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-2">
                            {exp.highlights.map((h, i) => (
                              <span key={i} className="text-xs text-rose-200/80 bg-rose-950/40 px-3 py-1 rounded-xl border border-rose-500/10">
                                &bull; {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'skills':
              return (
                <div key="skills" className="space-y-8">
                  <div className="border-b border-rose-500/20 pb-4">
                    <span className="text-xs uppercase tracking-widest text-rose-400 font-bold block mb-1">
                      Superpowers
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      Creative &amp; Technical Skills
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {skills.map((cat) => (
                      <div key={cat.id} className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/20 space-y-4">
                        <h4 className="text-lg font-bold text-rose-300">
                          {cat.name}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((sk) => (
                            <span 
                              key={sk.id}
                              className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-100 text-xs font-medium"
                            >
                              {sk.name}
                            </span>
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
                  <div className="border-b border-rose-500/20 pb-4">
                    <span className="text-xs uppercase tracking-widest text-rose-400 font-bold block mb-1">
                      Education
                    </span>
                    <h2 className="text-3xl font-extrabold text-white">
                      Academic Background
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                        <span className="text-xs text-rose-400 font-semibold">{edu.period}</span>
                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                        <p className="text-sm text-rose-200/70">{edu.institution}</p>
                        {edu.details && <p className="text-xs text-rose-100/60 font-sans mt-2">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'contact':
              return (
                <div key="contact" className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-rose-950/80 via-pink-950/50 to-amber-950/40 border border-rose-500/30 text-center space-y-6 shadow-2xl">
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {contact.heading || "Let's create magic."}
                  </h3>
                  <p className="text-base sm:text-lg text-rose-100/80 max-w-xl mx-auto font-sans leading-relaxed">
                    {contact.subheading}
                  </p>
                  <div className="pt-4">
                    <a 
                      href={contact.ctaUrl || `mailto:${contact.email}`}
                      className="inline-block px-10 py-4 rounded-full bg-white text-rose-950 font-extrabold text-base hover:bg-rose-100 hover:scale-105 transition-all shadow-xl"
                    >
                      {contact.ctaText || 'Start a Conversation'}
                    </a>
                  </div>
                  {contact.availabilityNote && (
                    <p className="text-xs text-rose-300/60 font-sans">
                      {contact.availabilityNote}
                    </p>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}

        <footer className="text-center text-xs text-rose-300/40 pt-8 border-t border-rose-500/20">
          <p>&copy; {new Date().getFullYear()} {profile.name} &bull; Creative Canvas</p>
        </footer>

      </div>
    </div>
  );
};

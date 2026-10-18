import type { PortfolioData } from '../types/portfolio';
import { getEffectiveAvatarUrl, getEffectiveProjectImageUrl } from '../types/portfolio';
import { Terminal, GitBranch, GitCommit, FolderGit2, ExternalLink, Mail, MapPin, Globe } from 'lucide-react';
import { GithubIcon } from '../components/common/Icons';

interface Props {
  data: PortfolioData;
}

export const DeveloperTemplate: React.FC<Props> = ({ data }) => {
  const { profile, projects, experience, skills, education, contact, theme, sections } = data;

  return (
    <div 
      className="min-h-full font-mono transition-colors duration-200"
      style={{
        backgroundColor: theme.backgroundColor || '#022c22',
        color: theme.textColor || '#ecfdf5',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        
        {/* Terminal Header Bar */}
        <div className="rounded-lg overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur shadow-2xl">
          <div className="bg-emerald-950/60 px-4 py-2.5 flex items-center justify-between border-b border-emerald-500/20 text-xs text-emerald-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-emerald-300/80 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                {profile.name.toLowerCase().replace(/\s+/g, '-')}-shell ~ zsh
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400/60 text-[11px]">
              <GitBranch className="w-3 h-3 text-emerald-400" />
              <span>main*</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Command: whoami */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span className="text-emerald-500 font-bold">$</span>
                <span className="text-emerald-200">whoami --verbose</span>
              </div>
              <div className="pl-4 border-l-2 border-emerald-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {getEffectiveAvatarUrl(profile) && (
                    <img 
                      src={getEffectiveAvatarUrl(profile)} 
                      alt={profile.name}
                      className="w-20 h-20 rounded border-2 border-emerald-500/50 object-cover shadow-lg shadow-emerald-950/50" 
                    />
                  )}
                  <div className="space-y-1.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {profile.name}
                    </h1>
                    <p className="text-emerald-400 text-sm font-semibold">
                      Role: {profile.title}
                    </p>
                    <p className="text-xs text-emerald-300/80 max-w-xl leading-relaxed">
                      {profile.tagline || profile.bio}
                    </p>
                    
                    {profile.statusBadge && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        {profile.statusBadge}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-emerald-400/80 pt-2">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {profile.location}
                    </span>
                  )}
                  {profile.email && (
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      {profile.email}
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      {profile.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <span className="text-emerald-500 font-bold">$</span>
                  <span className="text-emerald-200">cat ~/.social_links.json</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-3">
                  {profile.socialLinks.map((sl) => (
                    <a
                      key={sl.id}
                      href={sl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 hover:bg-emerald-800/30 hover:border-emerald-400 transition-all"
                    >
                      [{sl.label || sl.platform}]
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Sections */}
        {sections.map((section) => {
          if (!section.visible || section.id === 'hero') return null;

          switch (section.id) {
            case 'about':
              return (
                <div key="about" className="rounded-lg border border-emerald-500/20 bg-black/30 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold border-b border-emerald-500/20 pb-3">
                    <span className="text-emerald-500">$</span>
                    <span>cat ~/bio/about.md</span>
                  </div>
                  <p className="text-sm text-emerald-100/90 leading-relaxed font-sans font-light">
                    {profile.aboutLong || profile.bio}
                  </p>
                </div>
              );

            case 'projects':
              return (
                <div key="projects" className="rounded-lg border border-emerald-500/20 bg-black/30 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                      <FolderGit2 className="w-4 h-4 text-emerald-400" />
                      <span>git repositories --featured</span>
                    </div>
                    <span className="text-xs text-emerald-500/70">{projects.length} repos</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id}
                        className="rounded border border-emerald-500/20 bg-emerald-950/20 p-4 hover:border-emerald-400/50 hover:bg-emerald-950/30 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          {getEffectiveProjectImageUrl(proj) && (
                            <div className="overflow-hidden rounded h-28 mb-2 border border-emerald-500/20">
                              <img 
                                src={getEffectiveProjectImageUrl(proj)} 
                                alt={proj.title}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-white flex items-center gap-1.5">
                              <span className="text-emerald-400">~/</span>
                              {proj.title}
                            </span>
                            {proj.featured && (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-emerald-200/70 leading-relaxed font-sans">
                            {proj.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {proj.tags.map((t) => (
                              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-emerald-400 border border-emerald-500/20">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-emerald-500/10 text-xs">
                          {proj.demoUrl && (
                            <a 
                              href={proj.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-emerald-400 hover:text-white"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>deploy</span>
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a 
                              href={proj.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-emerald-400 hover:text-white"
                            >
                              <GithubIcon className="w-3 h-3" />
                              <span>source</span>
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
                <div key="experience" className="rounded-lg border border-emerald-500/20 bg-black/30 p-6 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold border-b border-emerald-500/20 pb-3">
                    <GitCommit className="w-4 h-4 text-emerald-400" />
                    <span>git log --format="commit %h - %an: %s"</span>
                  </div>

                  <div className="space-y-6 pl-2">
                    {experience.map((exp, idx) => (
                      <div key={exp.id} className="relative pl-6 border-l-2 border-emerald-500/30 space-y-2">
                        <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black"></span>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-xs font-bold text-emerald-400">
                            commit e4{idx}9b0 &bull; {exp.period}
                          </span>
                          <span className="text-xs text-emerald-300/60">{exp.location}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">
                          {exp.role} <span className="text-emerald-400 font-normal">@ {exp.company}</span>
                        </h3>
                        <p className="text-xs text-emerald-100/80 font-sans leading-relaxed">
                          {exp.description}
                        </p>
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="text-xs text-emerald-300/70 space-y-1 font-sans list-disc list-inside">
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
                <div key="skills" className="rounded-lg border border-emerald-500/20 bg-black/30 p-6 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold border-b border-emerald-500/20 pb-3">
                    <span className="text-emerald-500">$</span>
                    <span>neofetch --skills</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((cat) => (
                      <div key={cat.id} className="p-4 rounded border border-emerald-500/20 bg-emerald-950/20 space-y-3">
                        <h4 className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                          [#] {cat.name}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((sk) => (
                            <span 
                              key={sk.id}
                              className="text-xs px-2 py-0.5 rounded bg-black/50 text-emerald-200 border border-emerald-500/30 flex items-center gap-1"
                            >
                              <span>{sk.name}</span>
                              {sk.level && (
                                <span className="text-[10px] text-emerald-500">[{sk.level}%]</span>
                              )}
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
                <div key="education" className="rounded-lg border border-emerald-500/20 bg-black/30 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold border-b border-emerald-500/20 pb-3">
                    <span className="text-emerald-500">$</span>
                    <span>cat ~/credentials.log</span>
                  </div>

                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="p-3 rounded bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                          <p className="text-xs text-emerald-300">{edu.institution}</p>
                          {edu.details && <p className="text-xs text-emerald-400/60 font-sans mt-1">{edu.details}</p>}
                        </div>
                        <span className="text-xs text-emerald-500/80">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'contact':
              return (
                <div key="contact" className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-8 text-center space-y-4">
                  <div className="text-xs text-emerald-400 uppercase tracking-widest font-bold">
                    $ ./send_inquiry.sh
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {contact.heading || "Ready to execute a project?"}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200/80 max-w-lg mx-auto font-sans leading-relaxed">
                    {contact.subheading}
                  </p>
                  <div className="pt-2">
                    <a 
                      href={contact.ctaUrl || `mailto:${contact.email}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>{contact.ctaText || 'Connect Now'}</span>
                    </a>
                  </div>
                  {contact.availabilityNote && (
                    <p className="text-[11px] text-emerald-400/70">
                      // {contact.availabilityNote}
                    </p>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}

        <footer className="text-center text-xs text-emerald-500/50 pt-8 border-t border-emerald-500/20">
          <p>[EXIT CODE 0] &bull; Terminal Portfolio Session Complete</p>
        </footer>

      </div>
    </div>
  );
};

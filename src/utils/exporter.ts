import JSZip from 'jszip';
import type { PortfolioData, SectionConfig } from '../types/portfolio';
import { getEffectiveAvatarUrl, getEffectiveProjectImageUrl } from '../types/portfolio';
import { escapeHtml, sanitizeUrl } from './sanitize';

/**
 * Generate CSS styles for the standalone export based on user's theme configuration.
 */
export function generateStandaloneCss(data: PortfolioData): string {
  const { theme } = data;
  
  const fontLink = theme.fontFamily === 'Inter'
    ? 'Inter:wght@300;400;500;600;700'
    : theme.fontFamily === 'JetBrains Mono'
    ? 'JetBrains+Mono:wght@400;500;600;700'
    : theme.fontFamily === 'Outfit'
    ? 'Outfit:wght@400;500;600;700'
    : theme.fontFamily === 'Playfair Display'
    ? 'Playfair+Display:ital,wght@0,500;0,700;1,400'
    : theme.fontFamily === 'Plus Jakarta Sans'
    ? 'Plus+Jakarta+Sans:wght@400;500;600;700'
    : 'Space+Grotesk:wght@400;500;600;700';

  const radiusMap: Record<string, string> = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  };
  const borderRadius = radiusMap[theme.borderRadius] || '8px';

  return `
/* Prooffolio Static Export Stylesheet */
/* Generated: ${new Date().toISOString()} */
@import url('https://fonts.googleapis.com/css2?family=${fontLink}&display=swap');

:root {
  --primary: ${theme.primaryColor};
  --accent: ${theme.accentColor};
  --bg: ${theme.backgroundColor};
  --surface: ${theme.surfaceColor};
  --text: ${theme.textColor};
  --radius: ${borderRadius};
  --font-main: '${theme.fontFamily}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-main);
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s, opacity 0.2s;
}

a:hover {
  opacity: 0.85;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header & Nav */
header.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 0;
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-links a:hover {
  color: var(--text);
}

/* Section styling */
section {
  padding: 5rem 0;
}

.section-header {
  margin-bottom: 2.5rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

/* Hero Section */
.hero {
  padding: 6rem 0 4rem;
  position: relative;
}

.hero-wrap {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .hero-wrap {
    grid-template-columns: auto 1fr;
    gap: 3.5rem;
  }
}

.avatar-img {
  width: 140px;
  height: 140px;
  border-radius: var(--radius);
  object-fit: cover;
  border: 3px solid var(--primary);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.hero-name {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 0.5rem;
}

.hero-title {
  font-size: 1.35rem;
  color: var(--accent);
  margin-bottom: 1rem;
  font-weight: 600;
}

.hero-tagline {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 650px;
  margin-bottom: 1.75rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: transform 0.15s, opacity 0.2s, box-shadow 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: #ffffff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);
}

.btn-outline {
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
}

.social-bar {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-size: 0.85rem;
}

.social-pill:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Cards & Grid */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.project-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: calc(var(--radius) - 2px);
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.project-desc {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.25rem;
  flex: 1;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--accent);
}

.project-links {
  display: flex;
  gap: 1rem;
  font-size: 0.88rem;
  font-weight: 600;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -1.95rem;
  top: 0.25rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid var(--bg);
}

.timeline-period {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.timeline-role {
  font-size: 1.2rem;
  font-weight: 700;
}

.timeline-company {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.75rem;
}

.timeline-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
}

.timeline-bullets {
  padding-left: 1.2rem;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
}

.timeline-bullets li {
  margin-bottom: 0.35rem;
}

/* Skills */
.skill-category {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
}

.skill-cat-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--accent);
}

.skill-chip-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  padding: 0.35rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  font-size: 0.85rem;
}

/* Contact / CTA banner */
.contact-banner {
  background: linear-gradient(135deg, var(--surface) 0%, rgba(2, 132, 199, 0.15) 100%);
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 3.5rem 2rem;
  text-align: center;
}

.contact-heading {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.contact-sub {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  max-width: 600px;
  margin: 0 auto 2rem;
}

/* Footer */
footer {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2.5rem 0;
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}
`;
}

/**
 * Generate complete standalone HTML file.
 */
export function generateStandaloneHtml(data: PortfolioData): string {
  const css = generateStandaloneCss(data);
  const { profile, projects, experience, skills, education, contact, sections, templateId } = data;

  const sectionMap: Record<string, SectionConfig> = {};
  sections.forEach((s) => {
    sectionMap[s.id] = s;
  });

  // Render navigation links based on visible sections
  const navItems = sections
    .filter((s) => s.visible && s.id !== 'hero')
    .map((s) => `<li><a href="#${s.id}">${escapeHtml(s.title)}</a></li>`)
    .join('\n');

  // Render sections based on user's defined order
  const renderedSections = sections
    .filter((s) => s.visible)
    .map((s) => {
      switch (s.id) {
        case 'hero': {
          const effectiveAvatar = getEffectiveAvatarUrl(profile);
          return `
          <section id="hero" class="hero">
            <div class="container">
              <div class="hero-wrap">
                ${effectiveAvatar ? `<img src="${sanitizeUrl(effectiveAvatar)}" alt="${escapeHtml(profile.name)}" class="avatar-img" />` : ''}
                <div>
                  ${profile.statusBadge ? `
                    <div class="hero-status">
                      <span class="status-dot"></span>
                      <span>${escapeHtml(profile.statusBadge)}</span>
                    </div>` : ''}
                  <h1 class="hero-name">${escapeHtml(profile.name)}</h1>
                  <h2 class="hero-title">${escapeHtml(profile.title)}</h2>
                  <p class="hero-tagline">${escapeHtml(profile.tagline || profile.bio)}</p>
                  
                  <div class="hero-actions">
                    <a href="#contact" class="btn btn-primary">${escapeHtml(contact.ctaText || 'Get in Touch')}</a>
                    ${profile.resumeUrl ? `<a href="${sanitizeUrl(profile.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">View Resume</a>` : ''}
                  </div>

                  ${profile.socialLinks && profile.socialLinks.length > 0 ? `
                    <div class="social-bar">
                      ${profile.socialLinks.map((sl) => `
                        <a href="${sanitizeUrl(sl.url)}" target="_blank" rel="noopener noreferrer" class="social-pill">
                          <span>${escapeHtml(sl.label || sl.platform)}</span>
                        </a>
                      `).join('')}
                    </div>` : ''}
                </div>
              </div>
            </div>
          </section>`;
        }

        case 'about':
          return `
          <section id="about">
            <div class="container">
              <div class="section-header">
                <span class="section-tag">Overview</span>
                <h2 class="section-title">About Me</h2>
              </div>
              <div class="card" style="padding: 2rem;">
                <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem; color: rgba(255,255,255,0.9);">
                  ${escapeHtml(profile.aboutLong || profile.bio)}
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 2rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.6);">
                  ${profile.location ? `<div><strong>Location:</strong> <span style="color: var(--text);">${escapeHtml(profile.location)}</span></div>` : ''}
                  ${profile.email ? `<div><strong>Email:</strong> <a href="mailto:${escapeHtml(profile.email)}" style="color: var(--accent);">${escapeHtml(profile.email)}</a></div>` : ''}
                  ${profile.website ? `<div><strong>Website:</strong> <a href="${sanitizeUrl(profile.website)}" target="_blank" style="color: var(--accent);">${escapeHtml(profile.website)}</a></div>` : ''}
                </div>
              </div>
            </div>
          </section>`;

        case 'projects':
          return `
          <section id="projects">
            <div class="container">
              <div class="section-header">
                <span class="section-tag">Portfolio</span>
                <h2 class="section-title">Featured Projects</h2>
              </div>
              <div class="grid-2">
                ${projects.map((p) => {
                  const effectiveCover = getEffectiveProjectImageUrl(p);
                  return `
                  <article class="card">
                    ${effectiveCover ? `<img src="${sanitizeUrl(effectiveCover)}" alt="${escapeHtml(p.title)}" class="project-img" loading="lazy" />` : ''}
                    <h3 class="project-title">${escapeHtml(p.title)}</h3>
                    <p class="project-desc">${escapeHtml(p.description)}</p>
                    
                    <div class="tag-list">
                      ${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
                    </div>

                    <div class="project-links">
                      ${p.demoUrl ? `<a href="${sanitizeUrl(p.demoUrl)}" target="_blank" rel="noopener noreferrer">Live Demo &rarr;</a>` : ''}
                      ${p.githubUrl ? `<a href="${sanitizeUrl(p.githubUrl)}" target="_blank" rel="noopener noreferrer">Source Code &rarr;</a>` : ''}
                    </div>
                  </article>
                `;}).join('')}
              </div>
            </div>
          </section>`;

        case 'experience':
          return `
          <section id="experience">
            <div class="container">
              <div class="section-header">
                <span class="section-tag">Career History</span>
                <h2 class="section-title">Work Experience</h2>
              </div>
              <div class="timeline">
                ${experience.map((e) => `
                  <div class="timeline-item">
                    <span class="timeline-dot"></span>
                    <div class="timeline-period">${escapeHtml(e.period)}</div>
                    <h3 class="timeline-role">${escapeHtml(e.role)}</h3>
                    <div class="timeline-company">${escapeHtml(e.company)} &bull; ${escapeHtml(e.location)}</div>
                    <p class="timeline-desc">${escapeHtml(e.description)}</p>
                    ${e.highlights && e.highlights.length > 0 ? `
                      <ul class="timeline-bullets">
                        ${e.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
                      </ul>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'skills':
          return `
          <section id="skills">
            <div class="container">
              <div class="section-header">
                <span class="section-tag">Capabilities</span>
                <h2 class="section-title">Skills &amp; Tech Stack</h2>
              </div>
              <div class="grid-2">
                ${skills.map((cat) => `
                  <div class="skill-category">
                    <h3 class="skill-cat-title">${escapeHtml(cat.name)}</h3>
                    <div class="skill-chip-wrap">
                      ${cat.skills.map((sk) => `
                        <div class="skill-chip">
                          <strong>${escapeHtml(sk.name)}</strong>
                          ${sk.level ? `<span style="opacity: 0.6; font-size: 0.75rem; margin-left: 0.3rem;">(${sk.level}%)</span>` : ''}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'education':
          return `
          <section id="education">
            <div class="container">
              <div class="section-header">
                <span class="section-tag">Credentials</span>
                <h2 class="section-title">Education &amp; Certifications</h2>
              </div>
              <div class="grid-2">
                ${education.map((edu) => `
                  <div class="card">
                    <div class="timeline-period">${escapeHtml(edu.period)}</div>
                    <h3 class="project-title">${escapeHtml(edu.degree)}</h3>
                    <div class="timeline-company">${escapeHtml(edu.institution)}</div>
                    <p class="project-desc">${escapeHtml(edu.details)}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>`;

        case 'contact':
          return `
          <section id="contact">
            <div class="container">
              <div class="contact-banner">
                <h2 class="contact-heading">${escapeHtml(contact.heading || "Let's connect.")}</h2>
                <p class="contact-sub">${escapeHtml(contact.subheading || '')}</p>
                <a href="${sanitizeUrl(contact.ctaUrl || `mailto:${contact.email}`)}" class="btn btn-primary" style="font-size: 1.1rem; padding: 0.85rem 2rem;">
                  ${escapeHtml(contact.ctaText || 'Get in Touch')}
                </a>
                ${contact.availabilityNote ? `<p style="margin-top: 1.25rem; font-size: 0.85rem; color: rgba(255,255,255,0.6);">${escapeHtml(contact.availabilityNote)}</p>` : ''}
              </div>
            </div>
          </section>`;

        default:
          return '';
      }
    })
    .join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(profile.name)} — ${escapeHtml(profile.title)}</title>
    <meta name="description" content="${escapeHtml(profile.bio || profile.tagline)}" />
    <style>
${css}
    </style>
  </head>
  <body data-template="${escapeHtml(templateId)}">
    <header class="site-header">
      <div class="container nav-wrap">
        <a href="#hero" class="logo">${escapeHtml(profile.name)}</a>
        <nav>
          <ul class="nav-links">
            ${navItems}
          </ul>
        </nav>
      </div>
    </header>

    <main>
      ${renderedSections}
    </main>

    <footer>
      <div class="container">
        <p>&copy; <span id="year"></span> ${escapeHtml(profile.name)}. Built &amp; exported with <a href="https://prooffolio.pages.dev" target="_blank" rel="noopener">Prooffolio</a>.</p>
      </div>
    </footer>

    <script>
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  </body>
</html>`;
}

/**
 * Triggers a direct download of a single self-contained HTML file.
 */
export function exportSingleHtmlFile(data: PortfolioData): void {
  const htmlContent = generateStandaloneHtml(data);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const safeName = data.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'portfolio';
  anchor.href = url;
  anchor.download = `${safeName}-portfolio.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Triggers a zip download containing index.html, style.css, script.js, and Cloudflare Pages deployment README.
 */
export async function exportStaticZipBundle(data: PortfolioData): Promise<void> {
  const zip = new JSZip();
  const css = generateStandaloneCss(data);
  
  // Create modular index.html that references style.css and script.js
  const rawHtml = generateStandaloneHtml(data);
  let modularHtml = rawHtml
    .replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="./style.css" />')
    .replace(/<script>[\s\S]*?<\/script>/, '<script src="./script.js"></script>');

  // If avatarDataUrl is present, write it as a binary asset into the ZIP
  if (data.profile.avatarDataUrl && data.profile.avatarDataUrl.startsWith('data:image/')) {
    const parts = data.profile.avatarDataUrl.split(',');
    if (parts[1]) {
      const mime = parts[0].split(';')[0].replace('data:', '');
      const ext = mime.includes('webp') ? 'webp' : mime.includes('png') ? 'png' : 'jpg';
      const assetPath = `assets/avatar.${ext}`;
      zip.file(assetPath, parts[1], { base64: true });
      modularHtml = modularHtml.split(data.profile.avatarDataUrl).join(`./${assetPath}`);
    }
  }

  // If projects have imageDataUrl, extract them as local assets in the ZIP
  data.projects.forEach((proj, idx) => {
    if (proj.imageDataUrl && proj.imageDataUrl.startsWith('data:image/')) {
      const parts = proj.imageDataUrl.split(',');
      if (parts[1]) {
        const mime = parts[0].split(';')[0].replace('data:', '');
        const ext = mime.includes('webp') ? 'webp' : mime.includes('png') ? 'png' : 'jpg';
        const assetPath = `assets/project-${idx + 1}.${ext}`;
        zip.file(assetPath, parts[1], { base64: true });
        modularHtml = modularHtml.split(proj.imageDataUrl).join(`./${assetPath}`);
      }
    }
  });

  const scriptJs = `// Standalone Portfolio Script
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
`;

  const readmeContent = `# ${data.profile.name}'s Portfolio Website
Exported from **Prooffolio** (Freemium Portfolio Builder - Stage 1).

## 🚀 How to View Offline
Double-click \`index.html\` to open your website in any browser (Chrome, Safari, Firefox, Edge).
No local server, Node.js, or internet connection required!

## 🌐 Deploy to Cloudflare Pages for ₹0 / Free Forever
You can host this website on Cloudflare's high-speed global edge network for completely free with unlimited bandwidth:

### Option A: Direct Drag & Drop (Fastest - 60 seconds)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and sign in or create a free account.
2. In the sidebar, navigate to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
3. Set your project name (e.g. \`${data.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-portfolio\`).
4. Drag and drop this folder (or the unpacked files \`index.html\`, \`style.css\`, \`script.js\`).
5. Click **Deploy Site**!
6. Your portfolio is instantly live at \`https://<your-project-name>.pages.dev\`.

### Option B: Deploy via GitHub (Automatic Git Updates)
1. Push this folder to a new GitHub repository (e.g. \`my-portfolio\`).
2. In Cloudflare Pages, choose **Connect to Git**.
3. Select your repository.
4. Leave Build Command **empty** and Output Directory set to \`/\`.
5. Click **Save and Deploy**. Any future git pushes will automatically update your site!
`;

  zip.file('index.html', modularHtml);
  zip.file('style.css', css);
  zip.file('script.js', scriptJs);
  zip.file('README.md', readmeContent);
  zip.file('portfolio-data.json', JSON.stringify(data, null, 2));

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  const safeName = data.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'portfolio';
  anchor.href = url;
  anchor.download = `${safeName}-portfolio-static.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

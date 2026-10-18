import type { TemplateMetadata } from '../types/portfolio';

export const TEMPLATES: TemplateMetadata[] = [
  // --- FREE TEMPLATES ---
  {
    id: 'modern',
    name: 'Modern Bento',
    category: 'free',
    description: 'Clean SaaS-inspired layout with interactive Bento cards, glassmorphic accents, and responsive hierarchy.',
    tags: ['SaaS', 'Bento Grid', 'Glassmorphism', 'Clean'],
    previewGradient: 'from-sky-600 via-indigo-600 to-purple-600',
    accentColor: '#0284c7',
    features: ['Bento grid project cards', 'Glassmorphic badges', 'Skill progress metrics', 'Subtle hover elevations'],
    recommendedFor: 'Full-stack engineers, product designers, technical founders',
  },
  {
    id: 'developer',
    name: 'Developer Terminal',
    category: 'free',
    description: 'Tech-centric design with terminal headers, monospace accents, commit-style timeline, and dev badges.',
    tags: ['Terminal', 'Monospace', 'GitHub Vibe', 'Code-First'],
    previewGradient: 'from-emerald-600 via-teal-700 to-slate-900',
    accentColor: '#10b981',
    features: ['Terminal command prompt hero', 'Git commit history timeline', 'Tech stack chip clusters', 'Live/source code links'],
    recommendedFor: 'Backend devs, DevOps engineers, systems programmers, open-source contributors',
  },
  {
    id: 'minimal',
    name: 'Minimal Elegance',
    category: 'free',
    description: 'Monochrome, typography-driven presentation with generous whitespace and distraction-free clarity.',
    tags: ['Typography', 'Monochrome', 'Editorial', 'High Whitespace'],
    previewGradient: 'from-zinc-400 via-zinc-700 to-zinc-950',
    accentColor: '#e4e4e7',
    features: ['High-contrast serif / sans headings', 'Clean timeline markers', 'Minimalist project lists', 'Fast reading flow'],
    recommendedFor: 'Senior engineers, architects, consultants, minimalist designers',
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    category: 'free',
    description: 'Vibrant, expressive aesthetic with bold typography, dynamic color pops, and expressive project showcases.',
    tags: ['Expressive', 'Bold Type', 'Artistic', 'Vibrant'],
    previewGradient: 'from-pink-600 via-rose-500 to-amber-500',
    accentColor: '#f43f5e',
    features: ['Bold Space Grotesk headings', 'Warm gradient overlays', 'Visual project cards', 'Creative social pills'],
    recommendedFor: 'Creative technologists, frontend artisans, UI/UX designers, game devs',
  },

  // --- PREMIUM TEMPLATES (PREVIEW-ONLY IN STAGE 1) ---
  {
    id: 'executive',
    name: 'Executive 3D Showcase',
    category: 'premium',
    description: 'Multi-layered glassmorphic executive portfolio with metric impact counters and leadership spotlights.',
    tags: ['Executive', 'Glass 3D', 'Leadership', 'Metrics'],
    previewGradient: 'from-amber-500 via-orange-600 to-purple-900',
    accentColor: '#f59e0b',
    features: ['Executive impact KPIs', '3D tilt hover cards', 'Investor/Board bio block', 'Conference speaking section'],
    recommendedFor: 'CTOs, VP of Engineering, tech executives, enterprise consultants',
  },
  {
    id: 'agency',
    name: 'Studio Agency X',
    category: 'premium',
    description: 'High-impact agency layout featuring full-width case study deep dives and interactive client roster.',
    tags: ['Agency', 'Case Studies', 'Marquee', 'High-Impact'],
    previewGradient: 'from-violet-600 via-purple-700 to-cyan-500',
    accentColor: '#8b5cf6',
    features: ['Split-screen case study views', 'Interactive client badge marquee', 'Interactive service pricing cards', 'Curated testimonials'],
    recommendedFor: 'Design agencies, boutique engineering firms, senior freelancers',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077 HUD',
    category: 'premium',
    description: 'Futuristic sci-fi HUD terminal with neon scanlines, glitch accents, and holographic system monitors.',
    tags: ['Cyberpunk', 'Neon Glow', 'Sci-Fi HUD', 'Dark Future'],
    previewGradient: 'from-yellow-400 via-cyan-500 to-fuchsia-600',
    accentColor: '#06b6d4',
    features: ['Neon scanline overlay', 'Hexagonal skill radars', 'Diagnostic health bar stats', 'Holographic avatar frame'],
    recommendedFor: 'Web3 developers, game programmers, security researchers, VR architects',
  },
];

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'modern-indigo',
    name: 'Modern Sky',
    primary: '#0284c7',
    accent: '#38bdf8',
    bg: '#030712',
    surface: '#111827',
    text: '#f9fafb',
  },
  {
    id: 'emerald-tech',
    name: 'Emerald Matrix',
    primary: '#10b981',
    accent: '#34d399',
    bg: '#022c22',
    surface: '#064e3b',
    text: '#ecfdf5',
  },
  {
    id: 'violet-dream',
    name: 'Violet Nebula',
    primary: '#8b5cf6',
    accent: '#c084fc',
    bg: '#0f0728',
    surface: '#1e1145',
    text: '#faf5ff',
  },
  {
    id: 'minimal-slate',
    name: 'Monochrome Stealth',
    primary: '#e4e4e7',
    accent: '#a1a1aa',
    bg: '#09090b',
    surface: '#18181b',
    text: '#fafafa',
  },
  {
    id: 'sunset-rose',
    name: 'Sunset Rose',
    primary: '#f43f5e',
    accent: '#fb7185',
    bg: '#18070d',
    surface: '#2a0c18',
    text: '#fff1f2',
  },
  {
    id: 'clean-light',
    name: 'Clean Light',
    primary: '#2563eb',
    accent: '#3b82f6',
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
  },
];

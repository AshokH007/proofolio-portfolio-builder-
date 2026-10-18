import React, { useState } from 'react';
import { TEMPLATES } from '../../data/templates';
import type { TemplateId, PremiumTemplateId } from '../../types/portfolio';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Lock, 
  Layers, 
  Monitor, 
  CheckCircle2, 
  Zap, 
  Cloud, 
  Check,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

interface Props {
  onOpenEditorWithTemplate: (templateId: TemplateId) => void;
  onOpenPremiumPreview: (templateId: PremiumTemplateId) => void;
  onLaunchEditorDefault: () => void;
  onOpenResumeStudio?: () => void;
}

export const LandingPage: React.FC<Props> = ({
  onOpenEditorWithTemplate,
  onOpenPremiumPreview,
  onLaunchEditorDefault,
  onOpenResumeStudio,
}) => {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Default open first FAQ

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (filter === 'free') return t.category === 'free';
    if (filter === 'premium') return t.category === 'premium';
    return true;
  });

  const faqs = [
    {
      q: 'Are exported websites really 100% free to host on Cloudflare Pages?',
      a: 'Yes! Cloudflare Pages offers an unlimited free tier for static websites with no monthly bill. You can deploy your exported folder directly through the Cloudflare web dashboard or connect your GitHub repository with zero hosting fees forever.',
    },
    {
      q: 'Does the exported portfolio need Prooffolio to stay online?',
      a: 'Never. The static export generates pure standard HTML5, CSS3, and vanilla JavaScript. It has zero external dependencies on this editor, our servers, or any paid third-party runtime.',
    },
    {
      q: 'Where are my draft data and uploaded images stored?',
      a: 'Your draft data, theme settings, and uploaded images are optimized and stored exclusively in your local browser storage (LocalStorage). No personal data or credentials are ever sent to an external server. You can also download a JSON backup anytime or click "Delete All Local Data" to erase everything.',
    },
    {
      q: 'Can I generate and download a professional resume too?',
      a: 'Yes! Prooffolio includes a built-in Resume Builder that automatically maps your profile, career experience, education, skills, and projects into 5 distinct resume layouts (ATS Professional, Modern Tech, Minimal, Fresh Graduate, and Executive) with direct A4 PDF download.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-600/30">
              P
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">Prooffolio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                Stage 1 &bull; ₹0
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing &amp; Transparency</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenResumeStudio && (
              <button
                onClick={onOpenResumeStudio}
                className="hidden sm:flex px-3 sm:px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 hover:scale-105 items-center gap-1.5"
                title="Create an ATS-Friendly Resume"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>ATS Resume</span>
              </button>
            )}

            <button
              onClick={onLaunchEditorDefault}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-md shadow-sky-600/30 hover:scale-105 flex items-center gap-1.5"
            >
              <span>Launch Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
              <a
                href="#templates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                Template Gallery
              </a>
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                Pricing &amp; Transparency
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                FAQ
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-800 space-y-2">
              {onOpenResumeStudio && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenResumeStudio();
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Build ATS PDF Resume</span>
                </button>
              )}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLaunchEditorDefault();
                }}
                className="w-full py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/30"
              >
                <span>Open Visual Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
        {/* Ambient mesh background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[350px] bg-gradient-to-tr from-sky-600/20 via-indigo-600/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-sky-300 shadow-sm animate-pulse-subtle max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="truncate">Stage 1 Upgrade &bull; Images, Mobile &amp; Resume Builder</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] break-words">
            Build &amp; Export Developer Portfolios with{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Zero Server Lock-in
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Craft a polished, responsive portfolio in minutes. Edit with real-time visual preview, upload local images, and export production-ready static HTML/CSS files ready for <strong>Cloudflare Pages (₹0 Forever)</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-lg sm:max-w-none mx-auto">
            <button
              onClick={onLaunchEditorDefault}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-600/25 hover:scale-105 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Visual Editor</span>
            </button>
            {onOpenResumeStudio && (
              <button
                onClick={onOpenResumeStudio}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                <span>Build ATS Resume</span>
              </button>
            )}
            <a
              href="#templates"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>All 7 Templates</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Value Pillars Badges */}
          <div className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-xs">
                <strong className="text-white block font-semibold">Strict ₹0 Budget</strong>
                <span className="text-slate-400">No hidden subscriptions</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Download className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <div className="text-xs">
                <strong className="text-white block font-semibold">Static ZIP Export</strong>
                <span className="text-slate-400">HTML + CSS + Scripts</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Cloud className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div className="text-xs">
                <strong className="text-white block font-semibold">Cloudflare Pages</strong>
                <span className="text-slate-400">Free global edge hosting</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div className="text-xs">
                <strong className="text-white block font-semibold">Local-First Privacy</strong>
                <span className="text-slate-400">Stored in your browser</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Template Gallery Section */}
      <section id="templates" className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">
                Design Library
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Handcrafted Template Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                4 fully usable free templates plus 3 premium preview prototypes clearly labeled for Stage 2 roadmap evaluation.
              </p>
            </div>

            {/* Filter buttons - scrollable on mobile */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full scrollbar-none self-start md:self-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                  filter === 'all' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All (7)
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                  filter === 'free' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Free Templates (4)
              </button>
              <button
                onClick={() => setFilter('premium')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                  filter === 'premium' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Premium Previews (3)
              </button>
            </div>
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((tmpl) => {
              const isFree = tmpl.category === 'free';
              return (
                <div
                  key={tmpl.id}
                  className="rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    {/* Visual Preview Header banner */}
                    <div className={`h-40 bg-gradient-to-br ${tmpl.previewGradient} p-5 relative flex flex-col justify-between overflow-hidden`}>
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur border border-white/20">
                          {tmpl.id}
                        </span>
                        {isFree ? (
                          <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-sm">
                            Free Forever
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/90 text-slate-950 flex items-center gap-1 shadow-sm">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Preview Only</span>
                          </span>
                        )}
                      </div>

                      <div className="z-10">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {tmpl.name}
                        </h3>
                        <p className="text-xs text-white/80 line-clamp-1">
                          {tmpl.recommendedFor}
                        </p>
                      </div>

                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
                    </div>

                    {/* Template Card Body */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                        {tmpl.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {tmpl.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                        {tmpl.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-sky-400 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0">
                    {isFree ? (
                      <button
                        onClick={() => onOpenEditorWithTemplate(tmpl.id as TemplateId)}
                        className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 min-h-[42px]"
                      >
                        <span>Use This Template</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenPremiumPreview(tmpl.id as PremiumTemplateId)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-amber-500/30 min-h-[42px]"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Explore Design Preview</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Feature Deep Dive Section */}
      <section id="features" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">
              Engineering Features
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Built for Modern Web Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Everything you need to showcase your work professionally, with zero vendor entrapment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Live Visual Editor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive split-screen editor with desktop, tablet, and mobile device viewport frames. See color, font, and section updates instantly without reloading.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Standalone Static Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a clean, organized ZIP containing HTML, CSS, JS, and relative image assets. Open locally offline or upload directly to Cloudflare Pages for ₹0.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Section Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Toggle visibility and reorder sections (Projects, Career History, Skills, Education, Contact) with intuitive up/down controls.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing & Honesty Section */}
      <section id="pricing" className="py-16 sm:py-20 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Strict ₹0 Budget &bull; Zero Deception
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Stage 1 operates completely client-side. We do not store payment tokens, implement fake auth, or pretend a client-side paywall is secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Free Plan (Stage 1 Active) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border-2 border-sky-500 shadow-xl shadow-sky-500/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">Stage 1: Community Core</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold uppercase self-start sm:self-auto">
                    Active &bull; ₹0 Forever
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  ₹0 <span className="text-xs text-slate-400 font-sans font-normal">/ no credit card required</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full unrestricted access to visual customization, all 4 free templates, local image uploads, and clean static website export.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>4 Free hand-crafted responsive templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Local photo &amp; project cover image uploads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Built-in 5-template Resume Builder &amp; PDF download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Static ZIP &amp; Standalone HTML export</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>LocalStorage draft persistence &amp; backup JSON</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onLaunchEditorDefault}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors shadow-md shadow-sky-600/30 min-h-[44px]"
              >
                Start Editing Now (₹0)
              </button>
            </div>

            {/* Pro Plan (Stage 2 Roadmap) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-6 opacity-90">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">Stage 2: Pro Suite</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold uppercase self-start sm:self-auto">
                    Roadmap &bull; Preview Only
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-400 font-mono">
                  TBD <span className="text-xs text-slate-500 font-sans font-normal">/ launches with secure backend</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Advanced 3D executive layouts, cloud synchronization across devices, and verified custom domain routing.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Executive 3D, Agency Studio, and Cyberpunk HUD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Secure backend authentication &amp; cloud database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>1-click automatic Cloudflare DNS deployment</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200/80 leading-relaxed">
                Note: No payments are accepted today. Premium templates can be explored via design previews in the gallery.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section with interactive accordion */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Clear answers about hosting, image uploads, and privacy.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-sky-300 transition-colors min-h-[48px]"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded bg-slate-800 text-slate-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 sm:py-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="font-bold text-white">Prooffolio</span>
            <span>&bull; Stage 1 Freemium Portfolio Builder</span>
          </div>
          <div>
            Built with React, TypeScript, Tailwind CSS &bull; Deployable to Cloudflare Pages (₹0)
          </div>
        </div>
      </footer>

    </div>
  );
};

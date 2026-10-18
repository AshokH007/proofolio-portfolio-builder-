import React, { useState, useEffect } from 'react';
import type { 
  PortfolioData, 
  ResumeCustomization, 
  ResumeTemplateId,
  ResumeSectionId 
} from '../../types/portfolio';
import { ATSProfessionalResume } from './ATSProfessionalResume';
import { ModernTechResume } from './ModernTechResume';
import { MinimalResume } from './MinimalResume';
import { FreshGraduateResume } from './FreshGraduateResume';
import { ExecutiveResume } from './ExecutiveResume';
import { generateResumePdf } from '../../utils/pdfGenerator';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Palette, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  Layers,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeStudioModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  const [templateId, setTemplateId] = useState<ResumeTemplateId>('ats-professional');
  const [headlineOverride, setHeadlineOverride] = useState<string>('');
  const [summaryOverride, setSummaryOverride] = useState<string>('');
  const [accentColor, setAccentColor] = useState<string>('#1e40af');
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [sectionOrder, setSectionOrder] = useState<ResumeSectionId[]>([
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
  ]);
  const [sectionVisibility, setSectionVisibility] = useState<Record<ResumeSectionId, boolean>>({
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
  });

  const [activeSidebarTab, setActiveSidebarTab] = useState<'templates' | 'customize'>('templates');
  const [mobileView, setMobileView] = useState<'controls' | 'preview'>('preview');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  // Lock background page scrolling when modal is active; safely restore on cleanup
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCustomization: ResumeCustomization = {
    templateId,
    headlineOverride: headlineOverride.trim() || undefined,
    summaryOverride: summaryOverride.trim() || undefined,
    accentColor,
    showPhoto,
    sectionOrder,
    sectionVisibility,
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      setExportFeedback('Rendering vector PDF document with selectable text...');
      await generateResumePdf(data, currentCustomization);
      setExportFeedback('Resume PDF generated and downloaded successfully!');
      setTimeout(() => setExportFeedback(null), 3500);
    } catch (err: any) {
      console.error('Failed to generate PDF:', err);
      setExportFeedback('Error generating PDF. Please try Print / Save PDF.');
      setTimeout(() => setExportFeedback(null), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSystemPrint = () => {
    window.print();
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const list = [...sectionOrder];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setSectionOrder(list);
  };

  const toggleSection = (id: ResumeSectionId) => {
    setSectionVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const templatesList: Array<{
    id: ResumeTemplateId;
    name: string;
    tagline: string;
    description: string;
    badge: string;
  }> = [
    {
      id: 'ats-professional',
      name: 'ATS Professional',
      tagline: 'Single-Column • Black & White',
      description: 'Standard readable typography and conventional headings engineered to parse cleanly through automated applicant tracking systems.',
      badge: 'ATS-Conscious',
    },
    {
      id: 'modern-tech',
      name: 'Modern Tech',
      tagline: 'Software Engineer • Navy Accents',
      description: 'Crisp hierarchy with technical skill chips, project demo links, and modern typography.',
      badge: 'Popular',
    },
    {
      id: 'minimal',
      name: 'Minimal Elegance',
      tagline: 'Monochrome • High Whitespace',
      description: 'Sophisticated typography-first layout with clean numbered sections and generous margins.',
      badge: 'Clean',
    },
    {
      id: 'fresh-graduate',
      name: 'Fresh Graduate',
      tagline: 'Education & Projects First',
      description: 'Places academic degrees, coursework honors, and coding projects before career history.',
      badge: 'Early Career',
    },
    {
      id: 'executive',
      name: 'Executive Leadership',
      tagline: 'Two-Column • Strategic Impact',
      description: 'Sidebar for contact and core competencies, with wide column for career leadership highlights.',
      badge: 'Leadership',
    },
  ];

  // Helper to render active resume template component
  const renderResumePreview = () => {
    switch (templateId) {
      case 'modern-tech':
        return <ModernTechResume data={data} customization={currentCustomization} />;
      case 'minimal':
        return <MinimalResume data={data} customization={currentCustomization} />;
      case 'fresh-graduate':
        return <FreshGraduateResume data={data} customization={currentCustomization} />;
      case 'executive':
        return <ExecutiveResume data={data} customization={currentCustomization} />;
      case 'ats-professional':
      default:
        return <ATSProfessionalResume data={data} customization={currentCustomization} />;
    }
  };

  // Check if profile has minimal data
  const hasMinimalData = data.profile.name.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Resume Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                100% Free
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Mapped directly from your portfolio data &bull; Vector A4 PDF download
            </p>
          </div>
        </div>

        {/* Mobile View Switcher (Controls vs Live A4 Preview) */}
        <div className="flex md:hidden items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMobileView('controls')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              mobileView === 'controls' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Controls</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              mobileView === 'preview' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSystemPrint}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            title="Open browser print dialogue"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/30 hover:scale-105 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close Resume Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Notification banner */}
      {exportFeedback && (
        <div className="bg-sky-950/90 border-b border-sky-500/30 px-6 py-2 text-xs text-sky-200 flex items-center justify-center gap-2 z-10 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-sky-400" />
          <span>{exportFeedback}</span>
        </div>
      )}

      {/* Main Studio Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 min-w-0">
        
        {/* Left Control Panel */}
        <aside 
          className={`w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 flex-col flex-shrink-0 min-h-0 h-full overflow-hidden ${
            mobileView === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          
          {/* Sub Navigation */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950 p-2 gap-2 flex-shrink-0">
            <button
              onClick={() => setActiveSidebarTab('templates')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSidebarTab === 'templates'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Templates (5)
            </button>
            <button
              onClick={() => setActiveSidebarTab('customize')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSidebarTab === 'customize'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Customize &amp; Order
            </button>
          </div>

          <div className="flex-1 min-h-0 p-4 overflow-y-auto space-y-4">
            
            {/* TAB 1: TEMPLATE CARDS */}
            {activeSidebarTab === 'templates' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Select an intentionally engineered layout. All templates render your real portfolio details.
                </p>

                <div className="space-y-2.5">
                  {templatesList.map((tmpl) => {
                    const isSelected = templateId === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => setTemplateId(tmpl.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-sky-500 bg-sky-950/30 ring-1 ring-sky-500 shadow-md shadow-sky-500/10'
                            : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            {tmpl.name}
                          </h4>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {tmpl.badge}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-sky-400 mb-1">
                          {tmpl.tagline}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {tmpl.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: RESUME CUSTOMIZATION & OVERRIDES */}
            {activeSidebarTab === 'customize' && (
              <div className="space-y-5 text-xs text-slate-300">
                
                {/* Overrides */}
                <div className="space-y-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Resume Overrides (Optional)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Changes here only apply to your resume and will not overwrite your main portfolio.
                  </p>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Headline / Title Override
                      </label>
                      <input
                        type="text"
                        value={headlineOverride}
                        onChange={(e) => setHeadlineOverride(e.target.value)}
                        placeholder={data.profile.title || 'e.g. Staff Systems Architect'}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Summary Override
                      </label>
                      <textarea
                        rows={3}
                        value={summaryOverride}
                        onChange={(e) => setSummaryOverride(e.target.value)}
                        placeholder="Customize your professional summary specifically for job applications."
                        className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Accent Color for Modern Tech & Executive */}
                {(templateId === 'modern-tech' || templateId === 'executive') && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <label className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-sky-400" />
                      <span>Accent Color</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-slate-400">{accentColor}</span>
                    </div>
                  </div>
                )}

                {/* Photo toggle (Modern Tech & Executive) */}
                {(templateId === 'modern-tech' || templateId === 'executive') && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-semibold text-white">Include Profile Photo</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showPhoto}
                        onChange={(e) => setShowPhoto(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                    </label>
                  </div>
                )}

                {/* Section Ordering & Visibility */}
                <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Section Order &amp; Visibility</span>
                  </h4>

                  <div className="space-y-1.5 pt-1">
                    {sectionOrder.map((secId, idx) => {
                      const isVis = sectionVisibility[secId] !== false;
                      const labels: Record<ResumeSectionId, string> = {
                        summary: 'Professional Summary',
                        experience: 'Work Experience',
                        education: 'Education & Credentials',
                        skills: 'Technical Skills',
                        projects: 'Notable Projects',
                      };

                      return (
                        <div
                          key={secId}
                          className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                            isVis ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-900/40 border-slate-800/40 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSection(secId)}
                              className={`p-1 rounded ${isVis ? 'text-sky-400' : 'text-slate-600'}`}
                              title={isVis ? 'Hide section' : 'Show section'}
                            >
                              {isVis ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>
                            <span className="text-[11px] font-semibold">{labels[secId]}</span>
                          </div>

                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => moveSection(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => moveSection(idx, 'down')}
                              disabled={idx === sectionOrder.length - 1}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Sidebar Footer info */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span>Format: Standard A4 PDF</span>
              <span className="font-mono text-emerald-400">100% Selectable Text</span>
            </div>
            {/* Quick CTA to switch to preview on mobile */}
            <button
              onClick={() => setMobileView('preview')}
              className="md:hidden w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/30 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live A4 Resume Preview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </aside>

        {/* Right Live A4 Resume Preview Canvas */}
        <main 
          className={`flex-1 min-h-0 min-w-0 h-full bg-slate-950/80 overflow-y-auto p-4 sm:p-8 flex flex-col items-center ${
            mobileView === 'controls' ? 'hidden md:flex' : 'flex'
          }`}
          style={{ overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
          
          {/* Mobile Back Button to Controls */}
          <div className="md:hidden w-full max-w-[210mm] mb-3 flex items-center justify-between">
            <button
              onClick={() => setMobileView('controls')}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
              <span>← Switch Template / Edit</span>
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              A4 Preview
            </span>
          </div>

          {/* Incomplete profile notice */}
          {!hasMinimalData && (
            <div className="w-full max-w-[210mm] mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                Your profile name is currently blank. Return to the editor to add your name, experience, and contact details for a complete resume.
              </span>
            </div>
          )}

          {/* Render active template */}
          <div className="w-full max-w-[210mm] shadow-2xl rounded-sm overflow-hidden bg-white flex-shrink-0">
            {renderResumePreview()}
          </div>

          {/* Bottom spacing spacer so user can scroll comfortably past the last line */}
          <div className="h-16 flex-shrink-0 w-full pointer-events-none" />

        </main>

      </div>

    </div>
  );
};

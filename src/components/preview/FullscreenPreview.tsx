import React, { useState } from 'react';
import type { PortfolioData, DeviceMode, TemplateId } from '../../types/portfolio';
import { TemplateRenderer } from '../../templates/TemplateRenderer';
import { TEMPLATES } from '../../data/templates';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Download, 
  Share2, 
  Check,
  FileText
} from 'lucide-react';

interface Props {
  data: PortfolioData;
  onBackToEditor: () => void;
  onOpenExport: () => void;
  onOpenResumeStudio?: () => void;
  onTemplateChange: (templateId: TemplateId) => void;
}

export const FullscreenPreview: React.FC<Props> = ({
  data,
  onBackToEditor,
  onOpenExport,
  onOpenResumeStudio,
  onTemplateChange,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const freeTemplates = TEMPLATES.filter((t) => t.category === 'free');

  return (
    <div className="fixed inset-0 z-40 bg-slate-950 flex flex-col overflow-hidden">
      
      {/* Floating Top Control Header */}
      <header className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-50 flex-shrink-0">
        
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editor</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <span className="text-xs text-slate-400">Template:</span>
            <select
              value={data.templateId}
              onChange={(e) => onTemplateChange(e.target.value as TemplateId)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-sky-500"
            >
              {freeTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (Free)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Device Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              deviceMode === 'desktop' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px]">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              deviceMode === 'tablet' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px]">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              deviceMode === 'mobile' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px]">Mobile</span>
          </button>
        </div>

        {/* Right: Export & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
          {onOpenResumeStudio && (
            <button
              onClick={onOpenResumeStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-md shadow-emerald-600/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-md shadow-sky-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Static Site</span>
          </button>
        </div>

      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 overflow-y-auto bg-slate-950 flex flex-col items-center justify-start p-2 sm:p-6">
        <div
          className={`w-full transition-all duration-300 ${
            deviceMode === 'mobile'
              ? 'max-w-[390px] rounded-[36px] border-[8px] border-slate-800 shadow-2xl overflow-hidden my-4 min-h-[750px] bg-slate-950'
              : deviceMode === 'tablet'
              ? 'max-w-[768px] rounded-[24px] border-[6px] border-slate-800 shadow-2xl overflow-hidden my-4 min-h-[850px] bg-slate-950'
              : 'max-w-full min-h-full'
          }`}
        >
          {deviceMode === 'mobile' && (
            <div className="bg-slate-800 py-1.5 px-6 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
              <span>9:41</span>
              <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto"></div>
              <span>100%</span>
            </div>
          )}

          <TemplateRenderer data={data} />
        </div>
      </main>

    </div>
  );
};

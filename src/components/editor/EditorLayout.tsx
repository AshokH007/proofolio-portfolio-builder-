import React, { useState, useEffect } from 'react';
import type { PortfolioData, DeviceMode, TemplateId, PremiumTemplateId } from '../../types/portfolio';
import { SectionEditor } from './SectionEditor';
import { LivePreview } from './LivePreview';
import { TEMPLATES } from '../../data/templates';
import { savePortfolioData } from '../../utils/storage';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Save, 
  RotateCcw, 
  Trash2, 
  Eye, 
  Download,
  FileText
} from 'lucide-react';

interface Props {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  onBackToHome: () => void;
  onOpenFullscreenPreview: () => void;
  onOpenExport: () => void;
  onOpenResumeStudio: () => void;
  onOpenReset: () => void;
  onOpenDelete: () => void;
  onSelectPremiumPreview: (templateId: PremiumTemplateId) => void;
}

export const EditorLayout: React.FC<Props> = ({
  data,
  onChange,
  onBackToHome,
  onOpenFullscreenPreview,
  onOpenExport,
  onOpenResumeStudio,
  onOpenReset,
  onOpenDelete,
  onSelectPremiumPreview,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [mobileViewPane, setMobileViewPane] = useState<'editor' | 'preview'>('editor');

  // Autosave effect with debounce
  useEffect(() => {
    setSaveStatus('dirty');
    const timer = setTimeout(() => {
      setSaveStatus('saving');
      const res = savePortfolioData(data);
      if (res.success) {
        setSaveStatus('saved');
        const now = new Date();
        setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [data]);

  const handleManualSave = () => {
    setSaveStatus('saving');
    const res = savePortfolioData(data);
    if (res.success) {
      setSaveStatus('saved');
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  const freeTemplates = TEMPLATES.filter((t) => t.category === 'free');
  const premiumTemplates = TEMPLATES.filter((t) => t.category === 'premium');

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Top Navbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 flex-shrink-0">
        
        {/* Left: Home & Brand & Template Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            title="Back to Landing Page & Gallery"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gallery</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <span className="text-xs text-slate-400 hidden md:inline">Template:</span>
            <select
              value={data.templateId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'executive' || val === 'agency' || val === 'cyberpunk') {
                  onSelectPremiumPreview(val as PremiumTemplateId);
                } else {
                  onChange({ ...data, templateId: val as TemplateId });
                }
              }}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-sky-500 font-medium"
            >
              <optgroup label="Free Templates (Fully Usable)">
                {freeTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Free)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Premium Templates (Preview Only)">
                {premiumTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    🔒 {t.name} (Stage 1 Preview)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Center: Device switchers (Desktop / Tablet / Mobile) */}
        <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              deviceMode === 'desktop' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop Mode (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-[11px]">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              deviceMode === 'tablet' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet Mode (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-[11px]">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              deviceMode === 'mobile' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile Mode (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">Mobile</span>
          </button>
        </div>

        {/* Mobile pane toggle (Form vs Preview on small screens) */}
        <div className="flex lg:hidden items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMobileViewPane('editor')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              mobileViewPane === 'editor' ? 'bg-sky-600 text-white' : 'text-slate-400'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileViewPane('preview')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              mobileViewPane === 'preview' ? 'bg-sky-600 text-white' : 'text-slate-400'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Right: Autosave status, Save Now, Reset, Preview, Export */}
        <div className="flex items-center gap-2">
          
          {/* Autosave status indicator */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 pr-2 border-r border-slate-800">
            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Autosaved ({lastSavedTime})</span>
              </span>
            )}
            {saveStatus === 'saving' && (
              <span className="flex items-center gap-1 text-sky-400 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                <span>Saving...</span>
              </span>
            )}
            {saveStatus === 'dirty' && (
              <span className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Unsaved edits</span>
              </span>
            )}
          </div>

          {/* Explicit Manual Save Button */}
          <button
            onClick={handleManualSave}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Explicit Save to LocalStorage"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Reset to sample data */}
          <button
            onClick={onOpenReset}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 text-xs font-medium transition-colors flex items-center gap-1"
            title="Reset to default sample portfolio"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {/* Delete all local data */}
          <button
            onClick={onOpenDelete}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
            title="Delete all stored local data"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Resume Studio Button */}
          <button
            onClick={onOpenResumeStudio}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-600/20 hover:scale-105"
            title="Create ATS & Professional PDF Resumes"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* Fullscreen Preview */}
          <button
            onClick={onOpenFullscreenPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            title="Fullscreen Portfolio Preview"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Export Static Site Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/30 hover:scale-105"
            title="Export Static Website Bundle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

        </div>

      </header>

      {/* Main Split View Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Section Form Editor */}
        <div 
          className={`w-full lg:w-[460px] xl:w-[500px] flex-shrink-0 h-full overflow-hidden ${
            mobileViewPane === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          <SectionEditor
            data={data}
            onChange={onChange}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Right: Live Preview Pane */}
        <div 
          className={`flex-1 h-full overflow-hidden bg-slate-950 relative ${
            mobileViewPane === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          <LivePreview data={data} deviceMode={deviceMode} />
        </div>

      </div>

    </div>
  );
};

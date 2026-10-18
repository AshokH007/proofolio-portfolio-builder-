import React from 'react';
import { Lock, X, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import type { PremiumTemplateId } from '../types/portfolio';

interface Props {
  templateId: PremiumTemplateId | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectFreeTemplate: (id: 'modern' | 'developer' | 'minimal' | 'creative') => void;
}

export const PremiumPreviewModal: React.FC<Props> = ({
  templateId,
  isOpen,
  onClose,
  onSelectFreeTemplate,
}) => {
  if (!isOpen || !templateId) return null;

  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{template.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono uppercase">
                  Preview Only (Stage 1)
                </span>
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Honest Transparency Notice */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 space-y-1">
              <p className="font-semibold text-amber-300">
                Honesty &amp; Transparency Notice (Stage 1 &bull; ₹0 Budget)
              </p>
              <p>
                This application is running entirely client-side with zero backend or payment accounts. 
                In strict adherence to honesty principles, we do not implement fake payment buttons, fake countdown timers, or pretend a client-side paywall is secure.
              </p>
              <p>
                <strong>{template.name}</strong> is showcased as a design preview. Full unlocks will be enabled in Stage 2 with authenticated backend verification. In the meantime, you have <strong>100% unrestricted access to 4 handcrafted free templates</strong> with complete static exports.
              </p>
            </div>
          </div>

          {/* Template Visual Mockup */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Design Architecture &amp; Aesthetic
            </h4>
            
            <div className={`p-6 rounded-xl bg-gradient-to-br ${template.previewGradient} relative overflow-hidden text-white shadow-xl min-h-[220px] flex flex-col justify-between`}>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/40 backdrop-blur text-[11px] font-mono border border-white/20">
                STK-PREVIEW: {template.id.toUpperCase()}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest uppercase opacity-80">
                  {template.recommendedFor}
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  {template.name}
                </h2>
                <p className="text-sm opacity-90 max-w-md">
                  {template.description}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Template Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Planned Stage 2 Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {template.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Choose any of the 4 ready-to-deploy free templates below:
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onSelectFreeTemplate('modern');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/30"
            >
              <span>Use Modern Bento (Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

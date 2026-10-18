import React from 'react';
import type { PortfolioData, DeviceMode } from '../../types/portfolio';
import { TemplateRenderer } from '../../templates/TemplateRenderer';

interface Props {
  data: PortfolioData;
  deviceMode: DeviceMode;
}

export const LivePreview: React.FC<Props> = ({ data, deviceMode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-6 bg-slate-950/60">
      
      {/* Container sizing according to deviceMode */}
      <div 
        className={`transition-all duration-300 w-full flex flex-col ${
          deviceMode === 'mobile' 
            ? 'max-w-[390px] shadow-2xl rounded-[38px] border-[10px] border-slate-800 my-auto min-h-[750px] overflow-hidden' 
            : deviceMode === 'tablet'
            ? 'max-w-[768px] shadow-2xl rounded-[24px] border-[8px] border-slate-800 my-4 min-h-[850px] overflow-hidden'
            : 'max-w-full rounded-xl border border-slate-800 shadow-xl min-h-full'
        }`}
      >
        {/* Mobile / Tablet notch mockup */}
        {deviceMode === 'mobile' && (
          <div className="bg-slate-800 py-2 px-6 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto"></div>
            <span>5G 100%</span>
          </div>
        )}

        {deviceMode === 'tablet' && (
          <div className="bg-slate-800 py-1.5 px-6 flex items-center justify-center text-[11px] text-slate-400 font-mono select-none">
            <div className="w-3 h-3 rounded-full bg-slate-900"></div>
          </div>
        )}

        {/* Portfolio Live Renderer */}
        <div className="w-full flex-1 overflow-y-auto bg-slate-950">
          <TemplateRenderer data={data} />
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import type { PortfolioData } from '../../types/portfolio';
import { exportStaticZipBundle, exportSingleHtmlFile } from '../../utils/exporter';
import { exportDataAsJson, importDataFromJson } from '../../utils/storage';
import { 
  Download, 
  FileCode, 
  Archive, 
  Cloud, 
  CheckCircle2, 
  X, 
  Upload
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onImportSuccess: (importedData: PortfolioData) => void;
}

export const ExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
  onImportSuccess,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'cloudflare' | 'backup'>('download');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      setStatusMessage('Bundling static assets and packaging ZIP...');
      await exportStaticZipBundle(data);
      setStatusMessage('Static website ZIP downloaded successfully!');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error(err);
      setStatusMessage('Error exporting ZIP bundle.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSingleHtml = () => {
    try {
      exportSingleHtmlFile(data);
      setStatusMessage('Standalone HTML file downloaded successfully!');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error(err);
      setStatusMessage('Error exporting HTML file.');
    }
  };

  const handleBackupJson = () => {
    exportDataAsJson(data);
    setStatusMessage('JSON data backup downloaded!');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importDataFromJson(file);
      onImportSuccess(imported);
      setStatusMessage('Portfolio restored successfully from backup!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      alert(`Import failed: ${err.message || 'Invalid format'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Download className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Export &amp; Deploy Your Portfolio
              </h3>
              <p className="text-xs text-slate-400">
                100% Free &bull; Standalone HTML/CSS &bull; Zero Server Dependencies
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950 px-6 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('download')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'download' 
                ? 'border-sky-500 text-sky-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Download Static Files
          </button>
          <button
            onClick={() => setActiveTab('cloudflare')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'cloudflare' 
                ? 'border-sky-500 text-sky-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Cloudflare Pages (₹0 Deploy Guide)
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'backup' 
                ? 'border-sky-500 text-sky-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Backup &amp; Restore
          </button>
        </div>

        {/* Notification Banner */}
        {statusMessage && (
          <div className="bg-sky-950/80 border-b border-sky-500/30 px-6 py-2.5 text-xs text-sky-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* TAB 1: DOWNLOAD STATIC FILES */}
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white">
                      Complete Website ZIP Package
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Contains clean <code>index.html</code>, <code>style.css</code>, <code>script.js</code>, and a quick-start guide. Unpack and double-click to view offline or upload to any static hosting provider.
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  disabled={isExporting}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-md shadow-sky-600/20 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Packaging...' : 'Download ZIP'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-bold text-white">
                      Single Standalone HTML File
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Everything bundled into one single <code>.html</code> file with embedded CSS and JS. Extremely easy to email, attach, or open instantly anywhere without unzipping.
                  </p>
                </div>
                <button
                  onClick={handleDownloadSingleHtml}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Download HTML</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero runtime dependencies</span>
                </div>
                <p>
                  The exported website has zero connection to Prooffolio. It requires no Node.js server, no React runtime, and no paid hosting accounts.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CLOUDFLARE PAGES ₹0 GUIDE */}
          {activeTab === 'cloudflare' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/20 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Cloud className="w-4 h-4" />
                  <span>How to host your portfolio for ₹0 Forever on Cloudflare Pages</span>
                </div>
                <p className="text-xs text-sky-200/80 leading-relaxed">
                  Cloudflare Pages provides unlimited bandwidth, SSL certificates, global CDN edge caching, and a free <code>*.pages.dev</code> subdomain at zero cost.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-600/30 text-sky-400 flex items-center justify-center text-[11px] font-mono">1</span>
                    <span>Download your Static ZIP bundle</span>
                  </div>
                  <p className="pl-7 text-slate-400">
                    Click the "Download Static Files" tab and download your portfolio ZIP. Extract the folder on your computer.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-600/30 text-sky-400 flex items-center justify-center text-[11px] font-mono">2</span>
                    <span>Log in to Cloudflare Dashboard</span>
                  </div>
                  <p className="pl-7 text-slate-400">
                    Visit <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">dash.cloudflare.com</a> and sign in with your free Cloudflare account.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-600/30 text-sky-400 flex items-center justify-center text-[11px] font-mono">3</span>
                    <span>Upload Assets via Drag &amp; Drop</span>
                  </div>
                  <p className="pl-7 text-slate-400">
                    Go to <strong>Workers &amp; Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Upload assets</strong>. Name your project (e.g. <code>alex-portfolio</code>), drag and drop your extracted files, and click <strong>Deploy site</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-[11px] font-mono">4</span>
                    <span>Your portfolio is live!</span>
                  </div>
                  <p className="pl-7 text-slate-400">
                    You receive an immediate live URL: <code>https://alex-portfolio.pages.dev</code> with free HTTPS. You can bind a custom domain later whenever you wish.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>Download JSON Backup</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Save a full raw snapshot of your profile, projects, and custom styling to your computer.
                  </p>
                </div>
                <button
                  onClick={handleBackupJson}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  Download JSON
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Restore from JSON Backup</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Import an existing Prooffolio backup JSON file to resume editing on any browser or device.
                  </p>
                </div>
                <label className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Target Platform: Cloudflare Pages / Static CDN</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

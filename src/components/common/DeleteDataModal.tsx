import React from 'react';
import { Trash2, AlertOctagon, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteDataModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-rose-500/30 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-rose-400">
            <span className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <AlertOctagon className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-white">Delete All Local Data</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            In accordance with local-first privacy, your portfolio drafts and editor preferences are stored only in your browser's LocalStorage.
          </p>
          <p className="text-rose-300 font-semibold">
            Warning: This action will permanently erase all drafts, custom configurations, and preferences stored in this browser.
          </p>
          <p className="text-slate-400">
            If you want to keep a copy of your work, please use the <strong>Download JSON Backup</strong> option in the Export modal first.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-colors shadow-md shadow-rose-600/30 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Permanently Delete Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, AlertCircle, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { optimizeImageFile, validateImageFile } from '../../utils/imageOptimizer';

interface Props {
  label: string;
  sublabel?: string;
  dataUrl?: string;
  urlValue?: string;
  onDataUrlChange: (dataUrl: string | undefined) => void;
  onUrlValueChange: (url: string) => void;
  aspectRatio?: 'square' | 'video' | 'wide';
  maxWidth?: number;
  maxHeight?: number;
}

export const ImageUpload: React.FC<Props> = ({
  label,
  sublabel,
  dataUrl,
  urlValue,
  onDataUrlChange,
  onUrlValueChange,
  aspectRatio = 'square',
  maxWidth = 800,
  maxHeight = 600,
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(!dataUrl && !!urlValue);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectivePreview = dataUrl || urlValue;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);

    // Initial validation
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid image file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setIsOptimizing(true);
      const optimized = await optimizeImageFile(file, {
        maxWidth,
        maxHeight,
        cropSquare: aspectRatio === 'square',
        quality: 0.82,
      });

      onDataUrlChange(optimized.dataUrl);
    } catch (err: any) {
      console.error('Image optimization failed:', err);
      setErrorMessage(err.message || 'Failed to process image.');
    } finally {
      setIsOptimizing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onDataUrlChange(undefined);
    onUrlValueChange('');
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const aspectClass = aspectRatio === 'square' 
    ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl' 
    : aspectRatio === 'video'
    ? 'w-36 sm:w-44 aspect-video max-h-24 sm:max-h-28 rounded-xl'
    : 'w-36 sm:w-44 h-24 rounded-xl';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold text-slate-300">{label}</label>
          {sublabel && <p className="text-[11px] text-slate-500">{sublabel}</p>}
        </div>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL' : 'Use URL'}</span>
        </button>
      </div>

      {/* Main Upload Box & Preview */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex flex-row items-center gap-3 sm:gap-4">
          
          {/* Image Preview / Empty Placeholder */}
          <div className="relative group flex-shrink-0">
            {effectivePreview ? (
              <div className={`${aspectClass} overflow-hidden border border-slate-700 bg-slate-900 relative shadow-md`}>
                <img
                  src={effectivePreview}
                  alt={label}
                  className="w-full h-full object-cover"
                />
                {dataUrl && (
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/75 text-emerald-300 border border-emerald-500/30">
                    Uploaded
                  </span>
                )}
              </div>
            ) : (
              <div className={`${aspectClass} flex flex-col items-center justify-center border-2 border-dashed border-slate-800 bg-slate-900/50 text-slate-500`}>
                <ImageIcon className="w-5 h-5 mb-0.5 text-slate-600" />
                <span className="text-[10px]">No image</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex-1 min-w-0 space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileChange}
                className="hidden"
                id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
              />

              <label
                htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  isOptimizing
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm shadow-sky-600/30'
                }`}
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Optimizing...</span>
                  </>
                ) : effectivePreview ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Change Image</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </>
                )}
              </label>

              {effectivePreview && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-medium border border-slate-800 transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Supports JPG, PNG, or WebP. Auto-optimized &amp; stored locally.
            </p>
          </div>

        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Optional fallback URL input */}
        {showUrlInput && (
          <div className="pt-2 border-t border-slate-900 space-y-1">
            <label className="block text-[11px] text-slate-400">Or use an external Image URL</label>
            <input
              type="text"
              value={urlValue || ''}
              onChange={(e) => onUrlValueChange(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
            />
          </div>
        )}

      </div>
    </div>
  );
};

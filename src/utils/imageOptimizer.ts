/**
 * Client-Side Image Optimizer and Validator for Prooffolio.
 * Resizes, compresses, and converts uploaded images to WebP/JPEG data URLs
 * to ensure persistent LocalStorage storage without exceeding quotas.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  format: 'webp' | 'jpeg';
  width: number;
  height: number;
  sizeBytes: number;
}

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  cropSquare?: boolean;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_RAW_FILE_SIZE = 8 * 1024 * 1024; // 8MB raw limit

/**
 * Validates file type and size.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  const isMimeValid = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase());
  const isExtValid = /\.(jpe?g|png|webp)$/i.test(file.name);

  if (!isMimeValid && !isExtValid) {
    return { 
      valid: false, 
      error: 'Unsupported image format. Please select a JPG, PNG, or WebP image.' 
    };
  }

  if (file.size > MAX_RAW_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 8MB.` 
    };
  }

  return { valid: true };
}

/**
 * Reads a File into an HTMLImageElement and tests decoding.
 */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Corrupted or unreadable image file.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Optimizes an image file by resizing and compressing to WebP (with JPEG fallback).
 */
export async function optimizeImageFile(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<OptimizedImageResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const img = await loadImageFromFile(file);

  const maxWidth = options.maxWidth || 800;
  const maxHeight = options.maxHeight || 600;
  const quality = options.quality !== undefined ? options.quality : 0.82;
  const cropSquare = options.cropSquare || false;

  let srcX = 0;
  let srcY = 0;
  let srcWidth = img.naturalWidth || img.width;
  let srcHeight = img.naturalHeight || img.height;

  if (cropSquare) {
    const minDim = Math.min(srcWidth, srcHeight);
    srcX = (srcWidth - minDim) / 2;
    srcY = (srcHeight - minDim) / 2;
    srcWidth = minDim;
    srcHeight = minDim;
  }

  // Calculate target dimensions preserving aspect ratio
  let targetWidth = srcWidth;
  let targetHeight = srcHeight;

  if (targetWidth > maxWidth) {
    targetHeight = Math.round((targetHeight * maxWidth) / targetWidth);
    targetWidth = maxWidth;
  }

  if (targetHeight > maxHeight) {
    targetWidth = Math.round((targetWidth * maxHeight) / targetHeight);
    targetHeight = maxHeight;
  }

  // Draw to offscreen canvas with smooth bilinear scaling
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, targetWidth);
  canvas.height = Math.max(1, targetHeight);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable.');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    img,
    srcX,
    srcY,
    srcWidth,
    srcHeight,
    0,
    0,
    targetWidth,
    targetHeight
  );

  // Try WebP first, fallback to JPEG
  let dataUrl = canvas.toDataURL('image/webp', quality);
  let format: 'webp' | 'jpeg' = 'webp';

  if (!dataUrl.startsWith('data:image/webp')) {
    dataUrl = canvas.toDataURL('image/jpeg', quality);
    format = 'jpeg';
  }

  // Approximate byte size from base64 string
  const base64Str = dataUrl.split(',')[1] || '';
  const sizeBytes = Math.round((base64Str.length * 3) / 4);

  return {
    dataUrl,
    format,
    width: targetWidth,
    height: targetHeight,
    sizeBytes,
  };
}

/**
 * Checks if a string is a valid image data URL.
 */
export function isValidImageDataUrl(str: string | undefined | null): boolean {
  if (!str) return false;
  return /^data:image\/(webp|jpeg|jpg|png|gif);base64,/i.test(str.trim());
}

/**
 * Security & Sanitization utilities for Prooffolio.
 * Ensures all user inputs are safely escaped and URLs are validated before rendering or exporting.
 */

export function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  
  // Whitelist safe URL schemes: http, https, mailto, tel, relative anchors/paths, or image data URLs
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('/') ||
    /^data:image\/(webp|jpeg|jpg|png|gif);base64,/i.test(trimmed)
  ) {
    // Prevent quote breaks or script injection
    return trimmed.replace(/"/g, '%22').replace(/'/g, '%27');
  }
  
  // If user entered e.g. "github.com/name" without protocol, prepend https://
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return 'https://' + trimmed.replace(/"/g, '%22').replace(/'/g, '%27');
  }

  return '#';
}

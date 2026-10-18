import type { PortfolioData } from '../types/portfolio';
import { initialSampleData } from '../data/sampleData';
import { isValidImageDataUrl } from './imageOptimizer';

const STORAGE_KEY = 'prooffolio_draft_v1';
const PREFS_KEY = 'prooffolio_prefs_v1';

export interface EditorPreferences {
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  activeSection: string;
  lastSavedAt: string | null;
  autoSaveEnabled: boolean;
}

export interface SaveResult {
  success: boolean;
  timestamp: string;
  isQuotaError?: boolean;
  errorMessage?: string;
}

const defaultPreferences: EditorPreferences = {
  deviceMode: 'desktop',
  activeSection: 'profile',
  lastSavedAt: null,
  autoSaveEnabled: true,
};

export function savePortfolioData(data: PortfolioData): SaveResult {
  try {
    const timestamp = new Date().toISOString();
    const payload = {
      ...data,
      updatedAt: timestamp,
    };
    const serialized = JSON.stringify(payload);
    localStorage.setItem(STORAGE_KEY, serialized);
    
    // Also record last saved timestamp in preferences
    const prefs = loadPreferences();
    savePreferences({ ...prefs, lastSavedAt: timestamp });

    return { success: true, timestamp };
  } catch (error: any) {
    console.error('Failed to save portfolio data to localStorage:', error);
    
    // Detect quota error
    const isQuota = 
      error?.name === 'QuotaExceededError' || 
      error?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      error?.code === 22 ||
      error?.code === 1014;

    const errorMessage = isQuota 
      ? 'Browser storage quota reached. Please remove an uploaded image or use an external URL.' 
      : 'Failed to write to local storage.';

    return { 
      success: false, 
      timestamp: new Date().toISOString(),
      isQuotaError: isQuota,
      errorMessage,
    };
  }
}

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialSampleData;
    
    const parsed = JSON.parse(raw);
    // Basic shape validation & backward compatibility
    if (parsed && parsed.profile && parsed.theme && parsed.templateId) {
      // Ensure sections array exists
      if (!Array.isArray(parsed.sections) || parsed.sections.length === 0) {
        parsed.sections = initialSampleData.sections;
      }
      return parsed as PortfolioData;
    }
    return initialSampleData;
  } catch (error) {
    console.warn('Error reading stored portfolio data, using sample data:', error);
    return initialSampleData;
  }
}

export function resetToSampleData(): PortfolioData {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleData));
    const prefs = loadPreferences();
    savePreferences({ ...prefs, lastSavedAt: new Date().toISOString() });
    return initialSampleData;
  } catch (error) {
    console.error('Failed to reset portfolio data:', error);
    return initialSampleData;
  }
}

export function clearAllLocalData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PREFS_KEY);
  } catch (error) {
    console.error('Failed to clear local data:', error);
  }
}

export function savePreferences(prefs: EditorPreferences): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}

export function loadPreferences(): EditorPreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultPreferences;
  }
}

export function exportDataAsJson(data: PortfolioData): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `prooffolio-backup-${data.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'portfolio'}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function importDataFromJson(file: File): Promise<PortfolioData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.profile || !parsed.theme || !parsed.templateId) {
          throw new Error('Invalid Prooffolio JSON format. Missing required fields.');
        }

        // Validate any image data URLs in restored data
        if (parsed.profile.avatarDataUrl && !isValidImageDataUrl(parsed.profile.avatarDataUrl)) {
          console.warn('Restored avatarDataUrl is not a valid image data URL, discarding it.');
          delete parsed.profile.avatarDataUrl;
        }

        if (Array.isArray(parsed.projects)) {
          parsed.projects.forEach((proj: any) => {
            if (proj.imageDataUrl && !isValidImageDataUrl(proj.imageDataUrl)) {
              console.warn(`Restored project image for ${proj.title} is not valid, discarding.`);
              delete proj.imageDataUrl;
            }
          });
        }

        resolve(parsed as PortfolioData);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read backup file.'));
    reader.readAsText(file);
  });
}

/**
 * Calculates approximate localStorage usage in KB for debugging/status.
 */
export function getStorageUsage(): { usedKb: number; draftKb: number } {
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length * 2);
      }
    }
    const draft = localStorage.getItem(STORAGE_KEY) || '';
    return {
      usedKb: Math.round(total / 1024),
      draftKb: Math.round((draft.length * 2) / 1024),
    };
  } catch {
    return { usedKb: 0, draftKb: 0 };
  }
}

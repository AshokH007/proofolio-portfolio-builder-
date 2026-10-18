import React, { useState } from 'react';
import type { PortfolioData, TemplateId, PremiumTemplateId } from './types/portfolio';
import { loadPortfolioData, resetToSampleData, clearAllLocalData } from './utils/storage';
import { LandingPage } from './components/landing/LandingPage';
import { EditorLayout } from './components/editor/EditorLayout';
import { FullscreenPreview } from './components/preview/FullscreenPreview';
import { ExportModal } from './components/export/ExportModal';
import { ResetModal } from './components/common/ResetModal';
import { DeleteDataModal } from './components/common/DeleteDataModal';
import { PremiumPreviewModal } from './templates/PremiumPreviewModal';
import { ResumeStudioModal } from './components/resume/ResumeStudioModal';

type AppView = 'landing' | 'editor' | 'preview';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => loadPortfolioData());
  
  // Modals state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [premiumPreviewId, setPremiumPreviewId] = useState<PremiumTemplateId | null>(null);

  const handleOpenEditorWithTemplate = (templateId: TemplateId) => {
    setPortfolioData((prev) => ({ ...prev, templateId }));
    setCurrentView('editor');
  };

  const handleLaunchEditorDefault = () => {
    setCurrentView('editor');
  };

  const handleResetConfirm = () => {
    const res = resetToSampleData();
    setPortfolioData(res);
  };

  const handleDeleteConfirm = () => {
    clearAllLocalData();
    const res = resetToSampleData();
    setPortfolioData(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* 1. LANDING PAGE VIEW */}
      {currentView === 'landing' && (
        <LandingPage
          onOpenEditorWithTemplate={handleOpenEditorWithTemplate}
          onOpenPremiumPreview={(id) => setPremiumPreviewId(id)}
          onLaunchEditorDefault={handleLaunchEditorDefault}
          onOpenResumeStudio={() => setIsResumeOpen(true)}
        />
      )}

      {/* 2. VISUAL EDITOR VIEW */}
      {currentView === 'editor' && (
        <EditorLayout
          data={portfolioData}
          onChange={(newData) => setPortfolioData(newData)}
          onBackToHome={() => setCurrentView('landing')}
          onOpenFullscreenPreview={() => setCurrentView('preview')}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenResumeStudio={() => setIsResumeOpen(true)}
          onOpenReset={() => setIsResetOpen(true)}
          onOpenDelete={() => setIsDeleteOpen(true)}
          onSelectPremiumPreview={(id) => setPremiumPreviewId(id)}
        />
      )}

      {/* 3. FULLSCREEN PREVIEW VIEW */}
      {currentView === 'preview' && (
        <FullscreenPreview
          data={portfolioData}
          onBackToEditor={() => setCurrentView('editor')}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenResumeStudio={() => setIsResumeOpen(true)}
          onTemplateChange={(templateId) => setPortfolioData((prev) => ({ ...prev, templateId }))}
        />
      )}

      {/* MODALS */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={portfolioData}
        onImportSuccess={(imported) => {
          setPortfolioData(imported);
        }}
      />

      <ResetModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={handleResetConfirm}
      />

      <DeleteDataModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <PremiumPreviewModal
        isOpen={premiumPreviewId !== null}
        templateId={premiumPreviewId}
        onClose={() => setPremiumPreviewId(null)}
        onSelectFreeTemplate={(freeId) => {
          setPortfolioData((prev) => ({ ...prev, templateId: freeId }));
          setCurrentView('editor');
        }}
      />

      <ResumeStudioModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={portfolioData}
      />

    </div>
  );
};

export default App;

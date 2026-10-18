import React from 'react';
import type { PortfolioData } from '../types/portfolio';
import { ModernTemplate } from './ModernTemplate';
import { DeveloperTemplate } from './DeveloperTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CreativeTemplate } from './CreativeTemplate';

interface Props {
  data: PortfolioData;
}

export const TemplateRenderer: React.FC<Props> = ({ data }) => {
  switch (data.templateId) {
    case 'developer':
      return <DeveloperTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
};

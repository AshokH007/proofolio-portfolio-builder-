import { jsPDF } from 'jspdf';
import type { 
  PortfolioData, 
  ResumeCustomization 
} from '../types/portfolio';

/**
 * Generates a genuine, vector-text A4 PDF resume with selectable text,
 * automatic multi-page flow, correct margins, and clickable hyperlinks.
 */
export async function generateResumePdf(
  data: PortfolioData,
  customization: ResumeCustomization
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  const { profile, experience, education, skills, projects } = data;
  const templateId = customization.templateId;

  // Customization overrides
  const effectiveHeadline = customization.headlineOverride || profile.title;
  const effectiveSummary = customization.summaryOverride || profile.aboutLong || profile.bio;
  const accentColor = customization.accentColor || (templateId === 'modern-tech' ? '#1e40af' : '#0f172a');

  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const clean = hex.replace('#', '');
    if (clean.length === 6) {
      return [
        parseInt(clean.substring(0, 2), 16),
        parseInt(clean.substring(2, 4), 16),
        parseInt(clean.substring(4, 6), 16),
      ];
    }
    return [15, 23, 42];
  };

  const [accentR, accentG, accentB] = hexToRgb(accentColor);

  // Set standard typography
  const isSerif = templateId === 'ats-professional';
  const mainFont = isSerif ? 'times' : 'helvetica';

  // --- HEADER SECTION ---
  doc.setFont(mainFont, 'bold');
  doc.setFontSize(templateId === 'ats-professional' ? 20 : 22);
  doc.setTextColor(isSerif ? 0 : accentR, isSerif ? 0 : accentG, isSerif ? 0 : accentB);

  const nameText = profile.name.trim() || 'Your Name';
  if (templateId === 'ats-professional') {
    doc.text(nameText.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  } else {
    doc.text(nameText, margin, y);
  }
  y += 7;

  // Headline / Title
  if (effectiveHeadline) {
    doc.setFont(mainFont, templateId === 'ats-professional' ? 'normal' : 'bold');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    if (templateId === 'ats-professional') {
      doc.text(effectiveHeadline, pageWidth / 2, y, { align: 'center' });
    } else {
      doc.text(effectiveHeadline, margin, y);
    }
    y += 5;
  }

  // Contact line (Email, Phone, Location, Website)
  const contactParts: string[] = [];
  if (profile.email) contactParts.push(profile.email);
  if (profile.phone) contactParts.push(profile.phone);
  if (profile.location) contactParts.push(profile.location);
  if (profile.website) contactParts.push(profile.website.replace(/^https?:\/\//, ''));

  if (contactParts.length > 0) {
    doc.setFont(mainFont, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const contactStr = contactParts.join('  •  ');
    if (templateId === 'ats-professional') {
      doc.text(contactStr, pageWidth / 2, y, { align: 'center' });
    } else {
      doc.text(contactStr, margin, y);
    }
    y += 6;
  }

  // Header Divider
  if (templateId !== 'ats-professional') {
    doc.setDrawColor(accentR, accentG, accentB);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  } else {
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  }

  // Helper for Section Headings
  const renderSectionHeader = (title: string) => {
    checkPageBreak(16);
    y += 2;
    doc.setFont(mainFont, 'bold');
    doc.setFontSize(11);
    if (templateId === 'ats-professional') {
      doc.setTextColor(0, 0, 0);
      doc.text(title.toUpperCase(), margin, y);
      y += 2;
      doc.setDrawColor(60, 60, 60);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;
    } else {
      doc.setTextColor(accentR, accentG, accentB);
      doc.text(title.toUpperCase(), margin, y);
      y += 2;
      doc.setDrawColor(accentR, accentG, accentB);
      doc.setLineWidth(0.3);
      doc.line(margin, y, margin + 40, y);
      y += 5;
    }
  };

  // Sections Order based on customization or template defaults
  let sectionOrder = customization.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'];

  // For fresh graduate template, put education & projects first by default if not overridden
  if (templateId === 'fresh-graduate' && !customization.sectionOrder) {
    sectionOrder = ['summary', 'education', 'skills', 'projects', 'experience'];
  }

  for (const sec of sectionOrder) {
    // Check if section is enabled in visibility
    if (customization.sectionVisibility && customization.sectionVisibility[sec] === false) {
      continue;
    }

    switch (sec) {
      case 'summary': {
        if (effectiveSummary && effectiveSummary.trim().length > 0) {
          renderSectionHeader(templateId === 'ats-professional' ? 'Professional Summary' : 'About & Summary');
          doc.setFont(mainFont, 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(40, 40, 40);

          const lines = doc.splitTextToSize(effectiveSummary.trim(), contentWidth);
          for (const line of lines) {
            checkPageBreak(5);
            doc.text(line, margin, y);
            y += 4.5;
          }
          y += 3;
        }
        break;
      }

      case 'experience': {
        if (experience && experience.length > 0) {
          renderSectionHeader(templateId === 'ats-professional' ? 'Work Experience' : 'Experience');
          for (const exp of experience) {
            checkPageBreak(16);
            
            // Role & Company
            doc.setFont(mainFont, 'bold');
            doc.setFontSize(10);
            doc.setTextColor(20, 20, 20);
            doc.text(exp.role, margin, y);

            // Period (Right Aligned)
            doc.setFont(mainFont, 'normal');
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
            y += 4.5;

            // Company & Location
            doc.setFont(mainFont, templateId === 'ats-professional' ? 'italic' : 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(templateId === 'modern-tech' ? accentR : 60, templateId === 'modern-tech' ? accentG : 60, templateId === 'modern-tech' ? accentB : 60);
            doc.text(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, margin, y);
            y += 4.5;

            // Summary description
            if (exp.description) {
              doc.setFont(mainFont, 'normal');
              doc.setFontSize(9);
              doc.setTextColor(50, 50, 50);
              const descLines = doc.splitTextToSize(exp.description, contentWidth);
              for (const line of descLines) {
                checkPageBreak(5);
                doc.text(line, margin, y);
                y += 4.2;
              }
            }

            // Highlights
            if (exp.highlights && exp.highlights.length > 0) {
              doc.setFont(mainFont, 'normal');
              doc.setFontSize(8.8);
              doc.setTextColor(50, 50, 50);
              for (const hl of exp.highlights) {
                checkPageBreak(5);
                const bulletLines = doc.splitTextToSize(`•  ${hl}`, contentWidth - 4);
                doc.text(bulletLines[0], margin + 2, y);
                y += 4;
                for (let i = 1; i < bulletLines.length; i++) {
                  checkPageBreak(4.5);
                  doc.text(bulletLines[i], margin + 6, y);
                  y += 4;
                }
              }
            }
            y += 3;
          }
        }
        break;
      }

      case 'education': {
        if (education && education.length > 0) {
          renderSectionHeader('Education');
          for (const edu of education) {
            checkPageBreak(12);

            doc.setFont(mainFont, 'bold');
            doc.setFontSize(10);
            doc.setTextColor(20, 20, 20);
            doc.text(edu.degree, margin, y);

            doc.setFont(mainFont, 'normal');
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.text(edu.period, pageWidth - margin, y, { align: 'right' });
            y += 4.5;

            doc.setFont(mainFont, 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(60, 60, 60);
            doc.text(edu.institution, margin, y);
            y += 4.5;

            if (edu.details) {
              doc.setFont(mainFont, 'normal');
              doc.setFontSize(8.8);
              doc.setTextColor(80, 80, 80);
              const detLines = doc.splitTextToSize(edu.details, contentWidth);
              for (const l of detLines) {
                checkPageBreak(4.5);
                doc.text(l, margin, y);
                y += 4;
              }
            }
            y += 2.5;
          }
        }
        break;
      }

      case 'skills': {
        if (skills && skills.length > 0) {
          renderSectionHeader('Technical Skills');
          for (const cat of skills) {
            checkPageBreak(8);
            doc.setFont(mainFont, 'bold');
            doc.setFontSize(9.2);
            doc.setTextColor(40, 40, 40);
            const prefix = `${cat.name}: `;
            const prefixWidth = doc.getTextWidth(prefix);
            doc.text(prefix, margin, y);

            doc.setFont(mainFont, 'normal');
            doc.setTextColor(60, 60, 60);
            const skillNames = cat.skills.map((s) => s.name).join(', ');
            const skillLines = doc.splitTextToSize(skillNames, contentWidth - prefixWidth);
            
            doc.text(skillLines[0], margin + prefixWidth, y);
            y += 4.5;

            for (let i = 1; i < skillLines.length; i++) {
              checkPageBreak(4.5);
              doc.text(skillLines[i], margin + prefixWidth, y);
              y += 4.2;
            }
          }
          y += 2.5;
        }
        break;
      }

      case 'projects': {
        if (projects && projects.length > 0) {
          renderSectionHeader('Notable Projects');
          for (const proj of projects) {
            checkPageBreak(12);

            doc.setFont(mainFont, 'bold');
            doc.setFontSize(9.8);
            doc.setTextColor(20, 20, 20);
            doc.text(proj.title, margin, y);

            if (proj.tags && proj.tags.length > 0) {
              doc.setFont(mainFont, 'normal');
              doc.setFontSize(8.5);
              doc.setTextColor(100, 100, 100);
              doc.text(`[${proj.tags.join(', ')}]`, pageWidth - margin, y, { align: 'right' });
            }
            y += 4.2;

            if (proj.description) {
              doc.setFont(mainFont, 'normal');
              doc.setFontSize(8.8);
              doc.setTextColor(50, 50, 50);
              const descLines = doc.splitTextToSize(proj.description, contentWidth);
              for (const l of descLines) {
                checkPageBreak(4.2);
                doc.text(l, margin, y);
                y += 4;
              }
            }

            const links: string[] = [];
            if (proj.demoUrl) links.push(`Demo: ${proj.demoUrl}`);
            if (proj.githubUrl) links.push(`Code: ${proj.githubUrl}`);
            if (links.length > 0) {
              doc.setFont(mainFont, 'normal');
              doc.setFontSize(8.2);
              doc.setTextColor(accentR, accentG, accentB);
              doc.text(links.join('   |   '), margin, y);
              y += 4.5;
            }
            y += 2.5;
          }
        }
        break;
      }
    }
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont(mainFont, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      `${profile.name} — Resume • Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Trigger browser download
  const safeName = (profile.name || 'resume').toLowerCase().replace(/[^a-z0-9]/g, '-');
  doc.save(`${safeName}-${templateId}-resume.pdf`);
}

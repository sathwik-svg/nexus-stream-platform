import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ProjectReportData } from '../types/report';

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  status: string;
}

export async function exportReportPagesToPdf(
  report: ProjectReportData,
  containerElement?: HTMLElement | null,
  onProgress?: (progress: PdfExportProgress) => void
): Promise<Blob> {
  // Target A4 dimensions in mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  // Find page elements
  const pageNodes = containerElement
    ? containerElement.querySelectorAll<HTMLElement>('.print-page')
    : document.querySelectorAll<HTMLElement>('.print-page');

  if (pageNodes && pageNodes.length > 0) {
    const total = pageNodes.length;
    for (let i = 0; i < total; i++) {
      if (onProgress) {
        onProgress({
          currentPage: i + 1,
          totalPages: total,
          status: `Rendering page ${i + 1} of ${total}...`,
        });
      }

      const pageEl = pageNodes[i];
      const canvas = await html2canvas(pageEl, {
        scale: 2, // High resolution (300 DPI equivalent)
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 850,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }

    if (onProgress) {
      onProgress({
        currentPage: total,
        totalPages: total,
        status: 'Finalizing PDF document...',
      });
    }

    return pdf.output('blob');
  }

  // Fallback: Programmatic Vector PDF Generator if DOM elements are missing
  return generateVectorFallbackPdf(report);
}

export function generateVectorFallbackPdf(report: ProjectReportData): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const margin = 15;
  let y = 20;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 138); // Deep navy
  doc.text(report.title, margin, y, { maxWidth: 180 });
  y += 16;

  // Subtitle
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text(report.subtitle, margin, y, { maxWidth: 180 });
  y += 12;

  // Author Meta
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`Intern: ${report.author.name} | Role: ${report.author.role}`, margin, y);
  y += 6;
  doc.text(`Organization: ${report.author.organization} - ${report.author.department}`, margin, y);
  y += 6;
  doc.text(`Mentor: ${report.author.mentor} | Period: ${report.author.internshipPeriod}`, margin, y);
  y += 6;
  doc.text(`Repository: ${report.author.githubUrl}`, margin, y);
  y += 12;

  // Abstract
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('Executive Abstract', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const abstractLines = doc.splitTextToSize(report.abstract, 180);
  doc.text(abstractLines, margin, y);
  y += abstractLines.length * 5 + 8;

  // Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('1. Problem Statement & Solution', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const probLines = doc.splitTextToSize(`Problem: ${report.problemStatement}`, 180);
  doc.text(probLines, margin, y);
  y += probLines.length * 5 + 4;

  const solLines = doc.splitTextToSize(`Solution: ${report.proposedSolution}`, 180);
  doc.text(solLines, margin, y);

  // Page 2
  doc.addPage();
  y = 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text('2. Technology Stack & Key Features', margin, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  report.techStack.forEach(t => {
    doc.text(`• [${t.category}] ${t.name}: ${t.description}`, margin, y, { maxWidth: 180 });
    y += 8;
  });

  // Page 3
  doc.addPage();
  y = 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text('3. Technical Challenges & Outcomes', margin, y);
  y += 10;

  report.challenges.forEach((c, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.text(`Challenge ${idx + 1}: ${c.title}`, margin, y, { maxWidth: 180 });
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const cLines = doc.splitTextToSize(`Problem: ${c.problem} | Solution: ${c.solution} | Outcome: ${c.outcomeMetric}`, 180);
    doc.text(cLines, margin, y);
    y += cLines.length * 4.5 + 6;
  });

  // Page 4
  doc.addPage();
  y = 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text('4. Key Learnings, Future Roadmap & Endorsement', margin, y);
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(5, 150, 105);
  doc.text('Evaluator Endorsement:', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Evaluated by: ${report.academicOrCompanySignoff.evaluatorName} (${report.academicOrCompanySignoff.evaluatorRole})`, margin, y);
  y += 6;
  doc.text(report.academicOrCompanySignoff.companyStamp, margin, y);
  y += 6;
  doc.text(report.academicOrCompanySignoff.gradeOrStatus, margin, y);

  return doc.output('blob');
}

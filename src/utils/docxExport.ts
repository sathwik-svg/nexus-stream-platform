import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} from 'docx';
import { ProjectReportData } from '../types/report';

export async function exportReportToDocx(report: ProjectReportData): Promise<Blob> {
  const primaryColor = '1E3A8A'; // Deep Navy
  const secondaryColor = '0284C7'; // Cyan
  const lightBgColor = 'F1F5F9';
  const borderColor = 'CBD5E1';

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch (1440 dxa)
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Header / Title block
          new Paragraph({
            text: (report.author?.organization || 'ENTERPRISE CLOUD TECHNOLOGIES INC.').toUpperCase(),
            style: 'Header',
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: `${report.author.organization} | ${report.author.department}`,
                bold: true,
                size: 20,
                color: secondaryColor,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.TITLE,
            spacing: { before: 200, after: 140 },
            children: [
              new TextRun({
                text: report.title,
                bold: true,
                size: 38,
                color: primaryColor,
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: report.subtitle,
                italics: true,
                size: 24,
                color: '475569',
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: lightBgColor },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Intern: ', bold: true, size: 20 }),
                          new TextRun({ text: report.author.name, size: 20 }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Role: ', bold: true, size: 20 }),
                          new TextRun({ text: report.author.role, size: 20 }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Email: ', bold: true, size: 20 }),
                          new TextRun({ text: report.author.email, size: 20 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: lightBgColor },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Mentor: ', bold: true, size: 20 }),
                          new TextRun({ text: report.author.mentor, size: 20 }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Period: ', bold: true, size: 20 }),
                          new TextRun({ text: report.author.internshipPeriod, size: 20 }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Repository: ', bold: true, size: 20 }),
                          new TextRun({ text: report.author.githubUrl, size: 20, color: secondaryColor }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 240 } }),

          // Executive Abstract
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({ text: 'Executive Abstract', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: report.abstract, size: 22 })],
          }),

          // Section 1: Project Overview
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({ text: '1. Project Overview & Problem Solved', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 120, after: 80 },
            children: [new TextRun({ text: '1.1 Problem Statement', bold: true, size: 24 })],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [new TextRun({ text: report.problemStatement, size: 22 })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 120, after: 80 },
            children: [new TextRun({ text: '1.2 Proposed Solution & Architecture', bold: true, size: 24 })],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [new TextRun({ text: report.proposedSolution, size: 22 })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 120, after: 80 },
            children: [new TextRun({ text: '1.3 Core Objectives', bold: true, size: 24 })],
          }),
          ...report.coreObjectives.map(
            obj =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 60 },
                children: [new TextRun({ text: obj, size: 22 })],
              })
          ),

          // Section 2: Technology Stack
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '2. Technology Stack & Tooling Matrix', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: primaryColor },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Tier / Category', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: primaryColor },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Technology', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: primaryColor },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Role & Implementation', bold: true, color: 'FFFFFF' })] })],
                  }),
                ],
              }),
              ...report.techStack.map(
                t =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: t.category, size: 20 })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: t.name, bold: true, size: 20 })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: t.description, size: 20 })] })],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Section 3: Architecture & Workflow
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '3. System Architecture & Project Workflow', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          ...report.architectureNodes.map(
            node =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 80 },
                children: [
                  new TextRun({ text: `${node.label} (${node.tier.toUpperCase()}): `, bold: true }),
                  new TextRun({ text: `${node.details} [Stack: ${node.tech}]` }),
                ],
              })
          ),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 140, after: 80 },
            children: [new TextRun({ text: 'Data Workflow Pipeline', bold: true, size: 24 })],
          }),
          ...report.architectureFlows.map(
            (flow, i) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `Step ${i + 1}: `, bold: true, color: secondaryColor }),
                  new TextRun({ text: `${flow.from} -> ${flow.to} via [${flow.protocol}] - ${flow.label}` }),
                ],
                spacing: { after: 60 },
              })
          ),

          // Section 4: Key Features
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '4. Key Features Developed', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          ...report.keyFeatures.flatMap((feat, idx) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 120, after: 60 },
              children: [new TextRun({ text: `4.${idx + 1} ${feat.title}`, bold: true, size: 24 })],
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [new TextRun({ text: feat.description })],
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: 'Measured Impact: ', bold: true, color: primaryColor }),
                new TextRun({ text: feat.impactMetric, bold: true }),
              ],
            }),
            ...feat.subPoints.map(
              pt =>
                new Paragraph({
                  bullet: { level: 0 },
                  spacing: { after: 40 },
                  children: [new TextRun({ text: pt })],
                })
            ),
          ]),

          // Section 5: Project Showcase
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '5. Application Showcase (Screenshots & Mockups)', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          ...report.screenshots.flatMap((shot, idx) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 120, after: 60 },
              children: [new TextRun({ text: `Figure ${idx + 1}: ${shot.title} [${shot.category}]`, bold: true, size: 24 })],
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [new TextRun({ text: shot.caption, italics: true, color: '64748B' })],
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [new TextRun({ text: shot.description })],
            }),
            ...shot.callouts.map(
              callout =>
                new Paragraph({
                  bullet: { level: 0 },
                  spacing: { after: 40 },
                  children: [new TextRun({ text: callout })],
                })
            ),
          ]),

          // Section 6: Technical Challenges
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '6. Technical Challenges & Engineering Solutions', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          ...report.challenges.flatMap((c, idx) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 140, after: 60 },
              children: [new TextRun({ text: `Challenge ${idx + 1}: ${c.title}`, bold: true, size: 24, color: 'B91C1C' })],
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: 'Problem Context & Root Cause: ', bold: true }),
                new TextRun({ text: `${c.problem} ${c.rootCause}` }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({ text: 'Implemented Solution: ', bold: true, color: primaryColor }),
                new TextRun({ text: c.solution }),
              ],
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: 'Measured Outcome: ', bold: true, color: '059669' }),
                new TextRun({ text: c.outcomeMetric, bold: true }),
              ],
            }),
          ]),

          // Section 7: Key Learnings
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '7. Key Technical & Professional Learnings', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          ...report.keyLearnings.flatMap(learn => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 100, after: 40 },
              children: [new TextRun({ text: `${learn.category}: ${learn.title}`, bold: true, size: 24 })],
            }),
            new Paragraph({
              spacing: { after: 40 },
              children: [new TextRun({ text: learn.detail })],
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: 'Concrete Evidence: ', bold: true, italics: true }),
                new TextRun({ text: learn.evidence, italics: true }),
              ],
            }),
          ]),

          // Section 8: Future Improvements
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({ text: '8. Future Enhancements & Scalability Roadmap', bold: true, size: 28, color: primaryColor }),
            ],
          }),
          ...report.futureImprovements.flatMap((fi, idx) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 100, after: 40 },
              children: [new TextRun({ text: `8.${idx + 1} ${fi.title} [Priority: ${fi.priority} | Effort: ${fi.effort}]`, bold: true, size: 24 })],
            }),
            new Paragraph({
              spacing: { after: 40 },
              children: [new TextRun({ text: fi.description })],
            }),
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: 'Anticipated Impact: ', bold: true, color: secondaryColor }),
                new TextRun({ text: fi.expectedBenefit }),
              ],
            }),
          ]),

          // Section 9: Signoff
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 320, after: 120 },
            children: [new TextRun({ text: '9. Verification & Evaluator Endorsement', bold: true, size: 28, color: primaryColor })],
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: 'Evaluated by: ', bold: true }),
              new TextRun({ text: `${report.academicOrCompanySignoff.evaluatorName} (${report.academicOrCompanySignoff.evaluatorRole})` }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: report.academicOrCompanySignoff.companyStamp, italics: true })],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: report.academicOrCompanySignoff.gradeOrStatus,
                bold: true,
                color: '059669',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

import { ProjectReportData } from '../types/report';

export interface ReportStats {
  totalWords: number;
  readingTimeMinutes: number;
  screenshotCount: number;
  featuresCount: number;
  challengesCount: number;
  learningsCount: number;
  improvementsCount: number;
  completenessScore: number; // 0 - 100
  isSpecificationCompliant: boolean;
  complianceChecks: {
    hasOverview: boolean;
    hasKeyFeatures: boolean;
    hasTechStack: boolean;
    hasWorkflow: boolean;
    hasFourToSixScreenshots: boolean;
    hasLinks: boolean;
    hasTechnicalChallenges: boolean;
    hasKeyLearnings: boolean;
    hasFutureImprovements: boolean;
  };
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function calculateReportStats(report: ProjectReportData): ReportStats {
  let words = 0;
  words += countWords(report.title);
  words += countWords(report.subtitle);
  words += countWords(report.abstract);
  words += countWords(report.problemStatement);
  words += countWords(report.proposedSolution);
  report.coreObjectives.forEach(o => (words += countWords(o)));
  report.keyFeatures.forEach(f => {
    words += countWords(f.title) + countWords(f.description) + countWords(f.impactMetric);
    f.subPoints.forEach(sp => (words += countWords(sp)));
  });
  report.techStack.forEach(t => (words += countWords(t.name) + countWords(t.description)));
  report.architectureNodes.forEach(a => (words += countWords(a.label) + countWords(a.details)));
  report.screenshots.forEach(s => (words += countWords(s.title) + countWords(s.description) + countWords(s.caption)));
  report.challenges.forEach(c => {
    words += countWords(c.title) + countWords(c.problem) + countWords(c.solution) + countWords(c.outcomeMetric);
  });
  report.keyLearnings.forEach(k => (words += countWords(k.title) + countWords(k.detail) + countWords(k.evidence)));
  report.futureImprovements.forEach(fi => (words += countWords(fi.title) + countWords(fi.description) + countWords(fi.expectedBenefit)));

  const readingTimeMinutes = Math.max(1, Math.ceil(words / 225));

  const hasOverview = !!(report.abstract && report.problemStatement && report.proposedSolution);
  const hasKeyFeatures = report.keyFeatures.length >= 3;
  const hasTechStack = report.techStack.length >= 4;
  const hasWorkflow = report.architectureNodes.length >= 3 && report.architectureFlows.length >= 2;
  const hasFourToSixScreenshots = report.screenshots.length >= 4 && report.screenshots.length <= 6;
  const hasLinks = !!(report.author.githubUrl && report.author.liveDemoUrl);
  const hasTechnicalChallenges = report.challenges.length >= 2 && report.challenges.length <= 5;
  const hasKeyLearnings = report.keyLearnings.length >= 3;
  const hasFutureImprovements = report.futureImprovements.length >= 3;

  const checks = [
    hasOverview,
    hasKeyFeatures,
    hasTechStack,
    hasWorkflow,
    hasFourToSixScreenshots,
    hasLinks,
    hasTechnicalChallenges,
    hasKeyLearnings,
    hasFutureImprovements,
  ];

  const passingChecks = checks.filter(Boolean).length;
  const completenessScore = Math.round((passingChecks / checks.length) * 100);
  const isSpecificationCompliant = passingChecks === checks.length;

  return {
    totalWords: words,
    readingTimeMinutes,
    screenshotCount: report.screenshots.length,
    featuresCount: report.keyFeatures.length,
    challengesCount: report.challenges.length,
    learningsCount: report.keyLearnings.length,
    improvementsCount: report.futureImprovements.length,
    completenessScore,
    isSpecificationCompliant,
    complianceChecks: {
      hasOverview,
      hasKeyFeatures,
      hasTechStack,
      hasWorkflow,
      hasFourToSixScreenshots,
      hasLinks,
      hasTechnicalChallenges,
      hasKeyLearnings,
      hasFutureImprovements,
    },
  };
}

export function generateMarkdownReport(report: ProjectReportData): string {
  return `# ${report.title}
## ${report.subtitle}

**Author:** ${report.author.name} (${report.author.role})  
**Organization:** ${report.author.organization} - ${report.author.department}  
**Mentor:** ${report.author.mentor}  
**Internship Period:** ${report.author.internshipPeriod}  
**Contact:** ${report.author.email}  
**GitHub Repository:** ${report.author.githubUrl}  
**Live Demo:** ${report.author.liveDemoUrl}  

---

### Executive Abstract
${report.abstract}

---

### 1. Project Overview & Problem Solved
#### 1.1 Problem Statement
${report.problemStatement}

#### 1.2 Proposed Solution & Value Proposition
${report.proposedSolution}

#### 1.3 Core Objectives
${report.coreObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

---

### 2. Technology Stack & Tools Used
| Category | Technology | Description |
| :--- | :--- | :--- |
${report.techStack.map(t => `| ${t.category} | **${t.name}** | ${t.description} |`).join('\n')}

---

### 3. System Architecture & Project Workflow
The system utilizes a modern, resilient multi-tier distributed architecture:
${report.architectureNodes.map(n => `- **${n.label}** (${n.tier.toUpperCase()}): ${n.details} *(Tech: ${n.tech})*`).join('\n')}

#### Workflow Data Flow:
${report.architectureFlows.map((f, i) => `${i + 1}. **${f.from}** -> **${f.to}** via \`${f.protocol}\`: ${f.label}`).join('\n')}

---

### 4. Key Features Developed
${report.keyFeatures.map((f, i) => `#### 4.${i + 1} ${f.title}
${f.description}
- **Impact Metric:** ${f.impactMetric}
- **Key Capabilities:**
${f.subPoints.map(sp => `  - ${sp}`).join('\n')}
`).join('\n')}

---

### 5. Project Showcase (Screenshots & Visual Evidence)
${report.screenshots.map((s, i) => `#### Figure ${i + 1}: ${s.title}
*${s.caption}*
${s.description}
- **Key Callouts:**
${s.callouts.map(c => `  - ${c}`).join('\n')}
`).join('\n')}

---

### 6. Technical Challenges & Engineering Solutions
${report.challenges.map((c, i) => `#### Challenge ${i + 1}: ${c.title}
- **Context:** ${c.context}
- **Problem Statement:** ${c.problem}
- **Root Cause:** ${c.rootCause}
- **Implemented Solution:** ${c.solution}
- **Outcome & Metric:** ${c.outcomeMetric}
- **Core Mechanism:** \`${c.codeOrArchKey}\`
`).join('\n')}

---

### 7. Key Technical & Professional Learnings
${report.keyLearnings.map(k => `#### ${k.category}: ${k.title}
- **Detail:** ${k.detail}
- **Evidence:** ${k.evidence}
`).join('\n')}

---

### 8. Future Roadmap & Planned Improvements
${report.futureImprovements.map((imp, i) => `#### Enhancement ${i + 1}: ${imp.title} [Priority: ${imp.priority} | Effort: ${imp.effort}]
${imp.description}
- **Expected Benefit:** ${imp.expectedBenefit}
`).join('\n')}

---

### 9. Project Links & Verification
- **GitHub Repository:** [${report.author.githubUrl}](${report.author.githubUrl})
- **Interactive Live Demo:** [${report.author.liveDemoUrl}](${report.author.liveDemoUrl})

---
*Report Evaluated by: ${report.academicOrCompanySignoff.evaluatorName} (${report.academicOrCompanySignoff.evaluatorRole})*  
*${report.academicOrCompanySignoff.companyStamp}*  
*${report.academicOrCompanySignoff.gradeOrStatus}*
`;
}

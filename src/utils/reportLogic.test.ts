import test from 'node:test';
import assert from 'node:assert/strict';
import { countWords, calculateReportStats, generateMarkdownReport } from './reportLogic';
import { defaultProjectReport } from '../data/defaultReport';

test('countWords calculates accurate word counts', () => {
  assert.equal(countWords(''), 0);
  assert.equal(countWords('   '), 0);
  assert.equal(countWords('Software Engineering Intern'), 3);
  assert.equal(countWords('  A   quick   brown  fox   '), 4);
});

test('calculateReportStats verifies 100% compliance on default internship report', () => {
  const stats = calculateReportStats(defaultProjectReport);

  assert.ok(stats.totalWords > 1200, `Expected > 1200 words, got ${stats.totalWords}`);
  assert.ok(stats.readingTimeMinutes >= 5);
  assert.equal(stats.screenshotCount, 6, 'Should have 6 screenshots (between 4-6)');
  assert.equal(stats.challengesCount, 3, 'Should have 3 challenges (between 2-3)');
  assert.equal(stats.improvementsCount, 3, 'Should have 3 future improvements');
  assert.equal(stats.completenessScore, 100, 'Report must be 100% complete');
  assert.equal(stats.isSpecificationCompliant, true, 'Report must satisfy all spec requirements');

  assert.equal(stats.complianceChecks.hasOverview, true);
  assert.equal(stats.complianceChecks.hasKeyFeatures, true);
  assert.equal(stats.complianceChecks.hasTechStack, true);
  assert.equal(stats.complianceChecks.hasWorkflow, true);
  assert.equal(stats.complianceChecks.hasFourToSixScreenshots, true);
  assert.equal(stats.complianceChecks.hasLinks, true);
  assert.equal(stats.complianceChecks.hasTechnicalChallenges, true);
  assert.equal(stats.complianceChecks.hasKeyLearnings, true);
  assert.equal(stats.complianceChecks.hasFutureImprovements, true);
});

test('calculateReportStats catches missing elements on an incomplete report', () => {
  const incompleteReport = {
    ...defaultProjectReport,
    abstract: '',
    screenshots: defaultProjectReport.screenshots.slice(0, 2), // only 2 screenshots
    challenges: defaultProjectReport.challenges.slice(0, 1), // only 1 challenge
  };

  const stats = calculateReportStats(incompleteReport);
  assert.equal(stats.isSpecificationCompliant, false);
  assert.equal(stats.complianceChecks.hasOverview, false);
  assert.equal(stats.complianceChecks.hasFourToSixScreenshots, false);
  assert.equal(stats.complianceChecks.hasTechnicalChallenges, false);
  assert.ok(stats.completenessScore < 100);
});

test('generateMarkdownReport produces populated markdown document with correct headings', () => {
  const md = generateMarkdownReport(defaultProjectReport);
  assert.ok(md.includes('# NexusStream: Distributed Real-Time Observability'));
  assert.ok(md.includes('Sathwik Ganji'));
  assert.ok(md.includes('### 1. Project Overview & Problem Solved'));
  assert.ok(md.includes('### 2. Technology Stack & Tools Used'));
  assert.ok(md.includes('### 3. System Architecture & Project Workflow'));
  assert.ok(md.includes('### 5. Project Showcase (Screenshots & Visual Evidence)'));
  assert.ok(md.includes('### 6. Technical Challenges & Engineering Solutions'));
  assert.ok(md.includes('### 7. Key Technical & Professional Learnings'));
  assert.ok(md.includes('### 8. Future Roadmap & Planned Improvements'));
  assert.ok(md.includes('Figure 1: Executive telemetry operations dashboard'));
});

test('exportReportToDocx generates valid docx Blob without throwing errors', async () => {
  const { exportReportToDocx } = await import('./docxExport');
  const blob = await exportReportToDocx(defaultProjectReport);
  assert.ok(blob instanceof Blob, 'Output must be a Blob instance');
  assert.ok(blob.size > 1000, `Expected blob size > 1000 bytes, got ${blob.size}`);
});

test('generateVectorFallbackPdf generates valid pdf Blob without throwing errors', async () => {
  const { generateVectorFallbackPdf } = await import('./pdfExport');
  const blob = generateVectorFallbackPdf(defaultProjectReport);
  assert.ok(blob instanceof Blob, 'Output must be a Blob instance');
  assert.ok(blob.size > 1000, `Expected pdf blob size > 1000 bytes, got ${blob.size}`);
});



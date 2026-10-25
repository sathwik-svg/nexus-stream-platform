export interface AuthorInfo {
  name: string;
  role: string;
  organization: string;
  department: string;
  mentor: string;
  internshipPeriod: string;
  email: string;
  githubUrl: string;
  liveDemoUrl: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & Storage' | 'DevOps & Cloud' | 'Testing & Tools';
  description: string;
  version?: string;
  icon?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  impactMetric: string;
  subPoints: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  tier: 'client' | 'gateway' | 'service' | 'storage' | 'observability';
  details: string;
  tech: string;
}

export interface ArchitectureFlow {
  from: string;
  to: string;
  protocol: string;
  label: string;
}

export interface ProjectScreenshot {
  id: string;
  title: string;
  caption: string;
  description: string;
  category: string;
  callouts: string[];
  mockType: 'dashboard' | 'pipeline' | 'query' | 'workflow' | 'audit' | 'monitoring';
}

export interface TechnicalChallenge {
  id: string;
  title: string;
  context: string;
  problem: string;
  rootCause: string;
  solution: string;
  outcomeMetric: string;
  codeOrArchKey: string;
}

export interface LearningItem {
  category: 'System Architecture' | 'Concurrency & Performance' | 'Engineering Rigor' | 'Agile & Collaboration';
  title: string;
  detail: string;
  evidence: string;
}

export interface FutureImprovement {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  effort: string;
  description: string;
  expectedBenefit: string;
}

export interface ProjectReportData {
  id: string;
  title: string;
  subtitle: string;
  abstract: string;
  author: AuthorInfo;
  problemStatement: string;
  proposedSolution: string;
  coreObjectives: string[];
  techStack: TechItem[];
  keyFeatures: FeatureItem[];
  architectureNodes: ArchitectureNode[];
  architectureFlows: ArchitectureFlow[];
  screenshots: ProjectScreenshot[];
  challenges: TechnicalChallenge[];
  keyLearnings: LearningItem[];
  futureImprovements: FutureImprovement[];
  academicOrCompanySignoff: {
    evaluatorName: string;
    evaluatorRole: string;
    companyStamp: string;
    gradeOrStatus: string;
  };
}

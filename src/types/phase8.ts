export type StatusLabel = 'REAL' | 'DEMONSTRATION' | 'TEMPLATE' | 'PLACEHOLDER';

export interface EvidenceLink {
  label: string;
  url: string;
  type: 'doc' | 'code' | 'dashboard' | 'sop' | 'report';
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Shopify Engineering' | 'Operations & Catalog' | 'Analytics & Automation' | 'Optimization & Maintenance';
  shortDesc: string;
  overview: string;
  status: StatusLabel;
  problemsSolved: string[];
  deliverables: string[];
  processSteps: string[];
  technologies: string[];
  relatedCaseStudyIds: string[];
  evidenceLinks: EvidenceLink[];
  estimatedTimeline: string;
  pricingModel: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  status: StatusLabel;
  clientType: string;
  industry: string;
  overview: string;
  businessProblem: string;
  constraints: string[];
  myRole: string;
  solution: string;
  processSteps: { title: string; desc: string }[];
  deliverables: string[];
  technologies: string[];
  documentationLinks: { title: string; url: string }[];
  screenshots: { caption: string; url: string }[];
  reports: { name: string; type: string; summary: string }[];
  lessonsLearned: string[];
  serviceIds: string[];
}

export interface ProcessPhase {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  status: StatusLabel;
  keyActivities: string[];
  deliverables: string[];
  clientInputs: string[];
  qualityGate: string;
}

export type TechCategory = 
  | 'Frontend' 
  | 'Backend' 
  | 'CMS' 
  | 'Shopify' 
  | 'Analytics' 
  | 'Databases' 
  | 'Automation' 
  | 'Cloud' 
  | 'Version Control' 
  | 'AI Tools';

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  status: StatusLabel;
  iconName: string;
  description: string;
  experienceLevel: 'Expert' | 'Advanced' | 'Proficient';
  yearsExperience: string;
  keyFeatures: string[];
  relatedServices: string[];
  relatedProjectNames: string[];
}

export interface IndustryItem {
  id: string;
  name: string;
  status: StatusLabel;
  iconName: string;
  summary: string;
  typicalChallenges: string[];
  relevantServices: string[];
  exampleSolutions: string[];
  relatedCaseStudyIds: string[];
}

export type FAQCategory = 'Services' | 'Process' | 'Communication' | 'Maintenance' | 'Technology' | 'Project Delivery';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  status: StatusLabel;
  question: string;
  answer: string;
  keyTakeaway: string;
}

export interface ProjectIntakeForm {
  selectedServices: string[];
  budgetRange: string;
  timeline: string;
  projectType: 'Retainer' | 'One-Time Build' | 'Technical Audit' | 'Advisory / Consulting';
  contactName: string;
  contactEmail: string;
  companyName: string;
  storeUrl?: string;
  projectRequirements: string;
  uploadedFiles: { name: string; size: string; type: string }[];
}

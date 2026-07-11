/**
 * Production-grade Project Schema
 * Database-ready, scalable, and supports various project types
 * 
 * Design Principles:
 * - One unified Project schema
 * - Optional blocks (render only if present)
 * - Project type drives UI, not data shape
 * - Database-friendly (flat where possible, nested where meaningful)
 */

// ============================================
// Project Type Enum
// ============================================
export type ProjectType =
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "wordpress"
  | "no-code"
  | "ai-ml"
  | "research"
  | "open-source";

export type ProjectStatus = "concept" | "in-progress" | "live" | "archived";

export type ProjectVisibility = "public" | "private" | "nda";

// ============================================
// Media & Links (Decoupled from UI)
// ============================================
export interface ProjectMedia {
  banner?: string;
  thumbnail?: string;
  gallery?: string[];
  videoDemo?: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  documentation?: string;
  researchPaper?: string;
  figma?: string;
}

// ============================================
// Tech Stack (Flexible, category-agnostic)
// ============================================
export interface TechStack {
  primary?: string[];       // shown on cards
  frontend?: string[];
  backend?: string[];
  database?: string[];
  aiMl?: string[];
  realtime?: string[];
  devops?: string[];
  tools?: string[];
}

// ============================================
// Metrics (Recruiter-friendly, optional)
// ============================================
export interface ProjectMetrics {
  users?: string;
  scale?: string;
  performance?: string;
  impact?: string;
}

// ============================================
// Case Study Block (Only when needed)
// ============================================
export interface CaseStudyChallenge {
  problem: string;
  solution: string;
}

export interface CaseStudy {
  role?: string;
  teamSize?: number;
  targetUsers?: string;

  problem?: string;
  solution?: string;

  features?: string[];

  architecture?: string;

  challenges?: CaseStudyChallenge[];

  contribution?: string[];

  outcome?: string;

  learnings?: string[];   // Strong for AI / research projects
}

// ============================================
// Meta (Filtering, Admin, SEO)
// ============================================
export interface ProjectMeta {
  featured?: boolean;
  tags?: string[];
  company?: string;
  location?: string;
  confidentialityNote?: string;
}

// ============================================
// Main Project Interface (Database-ready)
// ============================================
export interface Project {
  // Core identifiers (always present)
  id: string;                   // DB primary key
  slug: string;                 // URL routing
  title: string;
  tagline?: string;
  description: string;

  // Classification
  type: ProjectType;
  status?: ProjectStatus;

  // Timeline
  year?: number;
  duration?: string;

  // Access control
  visibility: ProjectVisibility;

  // Assets
  media: ProjectMedia;
  links?: ProjectLinks;

  // Technical details
  techStack?: TechStack;

  // Quick metrics for cards/summaries
  summaryMetrics?: ProjectMetrics;

  // Deep dive content
  caseStudy?: CaseStudy;

  // Administrative & SEO
  meta?: ProjectMeta;
}

// ============================================
// Helper Types for UI Components
// ============================================

/**
 * Minimal view model for project cards
 * Derived from Project for optimized card rendering
 */
export interface ProjectCardViewModel {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  type: ProjectType;
  status?: ProjectStatus;
  year?: number;
  banner?: string;
  primaryStack?: string[];
  liveLink?: string;
  githubLink?: string;
  isFeatured?: boolean;
  visibility: ProjectVisibility;
}

/**
 * Converts a full Project to a card view model
 */
export function toCardViewModel(project: Project): ProjectCardViewModel {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    description: project.description,
    type: project.type,
    status: project.status,
    year: project.year,
    banner: project.media.banner,
    primaryStack: project.techStack?.primary,
    liveLink: project.links?.live,
    githubLink: project.links?.github,
    isFeatured: project.meta?.featured,
    visibility: project.visibility,
  };
}

/**
 * Type guard to check if project has a case study
 */
export function hasCaseStudy(project: Project): boolean {
  return !!project.caseStudy && (
    !!project.caseStudy.problem ||
    !!project.caseStudy.solution ||
    !!project.caseStudy.features?.length ||
    !!project.caseStudy.challenges?.length
  );
}

/**
 * Type guard to check if project has links
 */
export function hasLinks(project: Project): boolean {
  return !!project.links && (
    !!project.links.live ||
    !!project.links.github ||
    !!project.links.documentation ||
    !!project.links.researchPaper ||
    !!project.links.figma
  );
}

/**
 * Gets display-friendly status label
 */
export function getStatusLabel(status?: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    concept: "Concept",
    "in-progress": "In Progress",
    live: "Live",
    archived: "Archived",
  };
  return status ? labels[status] : "Unknown";
}

/**
 * Gets display-friendly type label
 */
export function getTypeLabel(type: ProjectType): string {
  const labels: Record<ProjectType, string> = {
    fullstack: "Full Stack",
    frontend: "Frontend",
    backend: "Backend",
    mobile: "Mobile",
    wordpress: "WordPress",
    "no-code": "No-Code",
    "ai-ml": "AI/ML",
    research: "Research",
    "open-source": "Open Source",
  };
  return labels[type];
}

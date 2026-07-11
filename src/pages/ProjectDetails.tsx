import { ArrowLeft, BookOpen, ExternalLink, Figma, FileText, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";
import { getStatusLabel, getTypeLabel, hasCaseStudy } from "../types/project";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section-container py-24">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <p className="text-muted-foreground">Could not locate the requested project.</p>
        <Link to="/projects" className="mt-6 inline-block text-primary underline">Back to projects</Link>
      </div>
    );
  }

  const caseStudy = project.caseStudy;
  const techStack = project.techStack;
  const links = project.links;
  const media = project.media;

  return (
    <main className="py-24">
      <div className="section-container mb-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
      <div className="section-container">
        {/* Hero */}
        {media.banner && (
          <div className="rounded-2xl overflow-hidden mb-8 shadow-lg bg-muted/30">
            <img src={media.banner} alt={project.title} className="w-full max-h-[500px] object-contain mx-auto" />
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm font-mono text-primary uppercase tracking-wide">
            {hasCaseStudy(project) ? "Case Study" : "Project"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">{project.title}</h1>
          {project.tagline && (
            <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">{project.tagline}</p>
          )}
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{project.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <div className="prose max-w-none">
                <p>{project.description}</p>
              </div>
            </section>

            {/* Project Snapshot (Executive Summary) */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">Project Snapshot</h2>
              <div className="grid sm:grid-cols-2 gap-4 bg-background/60 p-4 rounded-lg border border-border/30">
                <div className="space-y-2">
                  <div><strong>Project Type:</strong> {getTypeLabel(project.type)}</div>
                  <div><strong>Duration:</strong> {project.duration || '—'}</div>
                  <div><strong>My Role:</strong> {caseStudy?.role || '—'}</div>
                </div>
                <div className="space-y-2">
                  <div><strong>Team Size:</strong> {caseStudy?.teamSize || '—'}</div>
                  <div><strong>Status:</strong> {project.status ? getStatusLabel(project.status) : '—'}</div>
                  <div><strong>Target Users:</strong> {caseStudy?.targetUsers || '—'}</div>
                </div>
              </div>
            </section>

            {/* Problem & Solution */}
            {(caseStudy?.problem || caseStudy?.solution) && (
              <section className="grid md:grid-cols-2 gap-6">
                {caseStudy?.problem && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
                    <p className="text-muted-foreground">{caseStudy.problem}</p>
                  </div>
                )}
                {caseStudy?.solution && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Solution Overview</h3>
                    <p className="text-muted-foreground">{caseStudy.solution}</p>
                  </div>
                )}
              </section>
            )}

            {/* Impact / Outcome */}
            {caseStudy?.outcome && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Outcome</h3>
                <p className="text-muted-foreground">{caseStudy.outcome}</p>
              </section>
            )}

            {/* Key Features Breakdown */}
            {caseStudy?.features && caseStudy.features.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.features.map((f, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background/60 border border-border/30">
                      <h4 className="font-semibold">{f.split(':')[0] || f}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{f}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Architecture */}
            {caseStudy?.architecture && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Architecture</h3>
                <p className="text-muted-foreground">{caseStudy.architecture}</p>
              </section>
            )}

            {/* Challenges */}
            {caseStudy?.challenges && caseStudy.challenges.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Challenges & Solutions</h3>
                <div className="space-y-4">
                  {caseStudy.challenges.map((c, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background/60 border border-border/30">
                      <p className="font-medium text-foreground"><strong>Challenge:</strong> {c.problem}</p>
                      <p className="text-muted-foreground mt-2"><strong>Solution:</strong> {c.solution}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contributions */}
            {caseStudy?.contribution && caseStudy.contribution.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-3">My Contributions</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {caseStudy.contribution.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Learnings (great for AI/Research projects) */}
            {caseStudy?.learnings && caseStudy.learnings.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Key Learnings</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {caseStudy.learnings.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery */}
            {(media.gallery && media.gallery.length > 0) && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {media.gallery.map((img, i) => (
                    <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                      <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-52 object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Video Demo */}
            {media.videoDemo && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Video Demo</h3>
                <div className="rounded-lg overflow-hidden shadow-sm aspect-video">
                  <iframe
                    src={media.videoDemo}
                    title={`${project.title} Demo`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Interested in a similar solution?</h3>
              <p className="text-muted-foreground mb-4">I can prepare a tailored proposal and timeline for your requirements.</p>
              <Link to="/contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary/10 text-primary border border-primary/30">Get a Proposal</Link>
            </section>
          </article>

          <aside className="space-y-6">
            <div className="p-5 rounded-2xl bg-background/80 border border-border/50">
              <h4 className="font-semibold">Project Details</h4>
              <div className="mt-3 text-sm text-muted-foreground space-y-2">
                {project.year && <div><strong>Year:</strong> {project.year}</div>}
                <div><strong>Type:</strong> {getTypeLabel(project.type)}</div>
                {caseStudy?.role && <div><strong>Role:</strong> {caseStudy.role}</div>}
                {project.status && <div><strong>Status:</strong> {getStatusLabel(project.status)}</div>}
              </div>

              {/* Tech Stack */}
              {techStack?.primary && techStack.primary.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {techStack.primary.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-md text-xs bg-primary/10 text-primary">{s}</span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-2">
                {links?.live && (
                  <a href={links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
                {links?.github && (
                  <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border/30">
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                )}
                {links?.documentation && (
                  <a href={links.documentation} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border/30">
                    <BookOpen className="w-4 h-4" />
                    Docs
                  </a>
                )}
                {links?.researchPaper && (
                  <a href={links.researchPaper} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border/30">
                    <FileText className="w-4 h-4" />
                    Paper
                  </a>
                )}
                {links?.figma && (
                  <a href={links.figma} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border/30">
                    <Figma className="w-4 h-4" />
                    Figma
                  </a>
                )}
              </div>
            </div>

            {/* Detailed Tech Stack */}
            {techStack && (
              <div className="p-5 rounded-2xl bg-background/80 border border-border/50">
                <h4 className="font-semibold mb-3">Tech Stack</h4>
                <div className="space-y-3 text-sm">
                  {techStack.frontend && techStack.frontend.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Frontend:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.frontend.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {techStack.backend && techStack.backend.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Backend:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.backend.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {techStack.database && techStack.database.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Database:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.database.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-orange-500/10 text-orange-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {techStack.aiMl && techStack.aiMl.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">AI/ML:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.aiMl.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-purple-500/10 text-purple-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {techStack.realtime && techStack.realtime.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Real-time:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.realtime.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-cyan-500/10 text-cyan-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {techStack.devops && techStack.devops.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">DevOps:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.devops.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {techStack.tools && techStack.tools.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Tools:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {techStack.tools.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-gray-500/10 text-gray-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Metrics */}
            {project.summaryMetrics && (
              <div className="p-5 rounded-2xl bg-background/80 border border-border/50">
                <h4 className="font-semibold mb-3">Impact & Metrics</h4>
                <div className="space-y-2 text-sm">
                  {project.summaryMetrics.users && (
                    <div><strong>Users:</strong> <span className="text-muted-foreground">{project.summaryMetrics.users}</span></div>
                  )}
                  {project.summaryMetrics.scale && (
                    <div><strong>Scale:</strong> <span className="text-muted-foreground">{project.summaryMetrics.scale}</span></div>
                  )}
                  {project.summaryMetrics.performance && (
                    <div><strong>Performance:</strong> <span className="text-muted-foreground">{project.summaryMetrics.performance}</span></div>
                  )}
                  {project.summaryMetrics.impact && (
                    <div><strong>Impact:</strong> <span className="text-muted-foreground">{project.summaryMetrics.impact}</span></div>
                  )}
                </div>
              </div>
            )}

            {/* Meta / Tags */}
            {project.meta?.tags && project.meta.tags.length > 0 && (
              <div className="p-5 rounded-2xl bg-background/80 border border-border/50">
                <h4 className="font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.meta.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* NDA / Confidentiality Note */}
            {project.meta?.confidentialityNote && (
              <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-500 mb-2">Confidentiality Note</h4>
                <p className="text-sm text-muted-foreground">{project.meta.confidentialityNote}</p>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-background/80 border border-border/50">
              <h4 className="font-semibold">Contact</h4>
              <p className="text-sm text-muted-foreground">Looking to build something similar? Let's discuss scope, timeline and budget.</p>
              <Link to="/contact" className="mt-3 inline-block text-primary underline">Contact me</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;

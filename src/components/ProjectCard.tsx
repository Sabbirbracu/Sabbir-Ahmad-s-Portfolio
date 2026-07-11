import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Project, getTypeLabel } from "../types/project";

// Re-export Project type for backward compatibility
export type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const isInternalLink = (link?: string) => link && link.startsWith("/");

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const liveLink = project.links?.live;
  const githubLink = project.links?.github;
  const banner = project.media.banner;
  const primaryStack = project.techStack?.primary || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      {/* Animated Border Glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-xl opacity-0 group-hover:opacity-60 blur-sm transition-all duration-500 group-hover:duration-200" />

      {/* Card Container */}
      <div className="relative rounded-xl overflow-hidden bg-background/95 backdrop-blur-xl border border-border/50">

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary/50 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary/50 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary/50 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />

        {/* Banner Image */}
        <div className="relative aspect-[16/9] bg-muted/20 overflow-hidden">
          {banner && (
            <img
              src={banner}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          )}
          {/* Subtle bottom gradient only */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Year Badge */}
          {project.year && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-background/90 text-primary border border-primary/30 backdrop-blur-sm">
                <Zap className="w-2.5 h-2.5" />
                {project.year}
              </span>
            </div>
          )}

          {/* Floating Action Buttons */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            {liveLink && (
              isInternalLink(liveLink) ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={liveLink}
                    className="w-7 h-7 rounded-md bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground border border-border/50 hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-md bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground border border-border/50 hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              )
            )}
            {githubLink && (
              isInternalLink(githubLink) ? (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={githubLink}
                    className="w-7 h-7 rounded-md bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground border border-border/50 hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    <Github className="w-3 h-3" />
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-md bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground border border-border/50 hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  <Github className="w-3 h-3" />
                </motion.a>
              )
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Title Section */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Layers className="w-3 h-3 text-primary" />
              <span className="text-primary text-[10px] font-mono uppercase tracking-wider truncate">{project.tagline}</span>
            </div>
            <h3 className="text-sm font-bold font-heading text-foreground line-clamp-1">{project.title}</h3>
          </div>
          
          <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {primaryStack.slice(0, 3).map((tech) => (
              <span key={tech} className="px-1.5 py-0.5 text-[10px] font-mono text-foreground/80 rounded bg-muted/50 border border-border/30">
                {tech}
              </span>
            ))}
            {primaryStack.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground rounded bg-muted/30">
                +{primaryStack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{getTypeLabel(project.type)}</span>
            <Link to={`/projects/${project.slug}`}>
              <motion.button whileHover={{ x: 3 }} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                <span>View</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;

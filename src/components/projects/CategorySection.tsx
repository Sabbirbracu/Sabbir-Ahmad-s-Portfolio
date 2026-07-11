import { motion } from "framer-motion";
import React from "react";
import { Project } from "../../types/project";
import ProjectCard from "../ProjectCard";

interface Category {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  projects: Project[];
}

const CategorySection = ({ category, categoryIndex }: { category: Category; categoryIndex: number }) => {
  return (
    <section key={category.id} id={category.id} className="py-16 relative">
      {categoryIndex % 2 === 1 && (
        <div className="absolute inset-0 bg-muted/30" />
      )}
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <category.icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading">{category.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

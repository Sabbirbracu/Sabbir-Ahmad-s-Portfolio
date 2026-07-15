import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  FolderOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  Project,
} from "@/store/api/apiSlice";

const ProjectsSection = () => {
  const { toast } = useToast();
  const { data: apiProjects, isLoading, error, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    type: "fullstack" as const,
    status: "in-progress" as const,
    year: new Date().getFullYear(),
    duration: "",
    visibility: "public" as const,
    featured: false,
    media: {
      banner: "",
      gallery: [] as string[],
    },
    links: {
      live: "",
      github: "",
    },
    techStack: {
      primary: [] as string[],
      frontend: [] as string[],
      backend: [] as string[],
      database: [] as string[],
    },
  });

  // Transform API data
  const projects = apiProjects?.data || [];

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects. Make sure your backend is running.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredProjects = projects.filter(
    (project: any) =>
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack?.primary?.some((t: string) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleCreateProject = async () => {
    try {
      const projectData = {
        ...newProject,
        techStack: {
          primary: newProject.techStack.primary.filter(t => t.trim()),
          frontend: newProject.techStack.frontend.filter(t => t.trim()),
          backend: newProject.techStack.backend.filter(t => t.trim()),
          database: newProject.techStack.database.filter(t => t.trim()),
        },
      };

      await createProject(projectData).unwrap();
      
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      
      setNewProject({
        title: "",
        slug: "",
        tagline: "",
        description: "",
        type: "fullstack",
        status: "in-progress",
        year: new Date().getFullYear(),
        duration: "",
        visibility: "public",
        featured: false,
        media: { banner: "", gallery: [] },
        links: { live: "", github: "" },
        techStack: { primary: [], frontend: [], backend: [], database: [] },
      });
      setIsCreateOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create project",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject || !editingProject.id) return;
    
    try {
      await updateProject({
        id: editingProject.id,
        data: editingProject,
      }).unwrap();
      
      toast({
        title: "Success",
        description: "Project updated successfully!",
      });
      
      setEditingProject(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await deleteProject(id).unwrap();
      
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-500";
      case "archived":
      case "concept":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title *</Label>
                  <Input
                    placeholder="e.g., E-Commerce Platform"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    placeholder="e.g., ecommerce-platform"
                    value={newProject.slug}
                    onChange={(e) =>
                      setNewProject({ ...newProject, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
                    }
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  placeholder="Short catchy description"
                  value={newProject.tagline}
                  onChange={(e) =>
                    setNewProject({ ...newProject, tagline: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Describe your project in detail..."
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select
                    value={newProject.type}
                    onValueChange={(value: any) =>
                      setNewProject({ ...newProject, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="ai-ml">AI/ML</SelectItem>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="no-code">No-Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status *</Label>
                  <Select
                    value={newProject.status}
                    onValueChange={(value: any) =>
                      setNewProject({ ...newProject, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concept">Concept</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    type="number"
                    placeholder="2024"
                    value={newProject.year}
                    onChange={(e) =>
                      setNewProject({ ...newProject, year: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Banner Image URL</Label>
                <Input
                  placeholder="https://example.com/image.png"
                  value={newProject.media.banner}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      media: { ...newProject.media, banner: e.target.value },
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input
                    placeholder="https://myproject.com"
                    value={newProject.links.live}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        links: { ...newProject.links, live: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input
                    placeholder="https://github.com/..."
                    value={newProject.links.github}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        links: { ...newProject.links, github: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Tech Stack (comma-separated)</Label>
                <Input
                  placeholder="React, Node.js, MongoDB"
                  value={newProject.techStack.primary.join(", ")}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      techStack: {
                        ...newProject.techStack,
                        primary: e.target.value.split(",").map((t) => t.trim()),
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={newProject.featured}
                  onCheckedChange={(checked) =>
                    setNewProject({ ...newProject, featured: checked })
                  }
                />
                <Label>Featured Project</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Add Project"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProjects.map((project: any, index: number) => (
          <motion.div
            key={project.id || project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={project.media?.banner || project.media?.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.meta?.featured && (
                  <Badge className="absolute top-2 left-2 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base line-clamp-1">
                      {project.title}
                    </CardTitle>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {project.links?.live && (
                        <DropdownMenuItem asChild>
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </a>
                        </DropdownMenuItem>
                      )}
                      {project.links?.github && (
                        <DropdownMenuItem asChild>
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => setEditingProject(project)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteProject(project.id || project._id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(project.techStack?.primary || []).slice(0, 4).map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {(project.techStack?.primary || []).length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{(project.techStack?.primary || []).length - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? "No projects found matching your search" : "No projects yet. Add your first project!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsSection;

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Briefcase,
  Calendar,
  Building2,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  technologies: string[];
}

const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    startDate: "2022-01",
    endDate: null,
    isCurrent: true,
    description: "Leading development of enterprise web applications...",
    technologies: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Digital Agency",
    location: "New York, NY",
    startDate: "2020-03",
    endDate: "2021-12",
    isCurrent: false,
    description: "Built custom web solutions for various clients...",
    technologies: ["Vue.js", "Python", "Django", "PostgreSQL"],
  },
];

const ExperiencesSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    technologies: "",
  });

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateExperience = () => {
    const experience: Experience = {
      id: Date.now().toString(),
      title: newExperience.title,
      company: newExperience.company,
      location: newExperience.location,
      startDate: newExperience.startDate,
      endDate: newExperience.isCurrent ? null : newExperience.endDate,
      isCurrent: newExperience.isCurrent,
      description: newExperience.description,
      technologies: newExperience.technologies.split(",").map((t) => t.trim()),
    };
    setExperiences([experience, ...experiences]);
    setNewExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      technologies: "",
    });
    setIsCreateOpen(false);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Experience</DialogTitle>
              <DialogDescription>
                Add a new job experience to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    placeholder="e.g., Senior Developer"
                    value={newExperience.title}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    placeholder="Company name"
                    value={newExperience.company}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, company: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="e.g., San Francisco, CA"
                  value={newExperience.location}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, location: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={newExperience.startDate}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={newExperience.endDate}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, endDate: e.target.value })
                    }
                    disabled={newExperience.isCurrent}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newExperience.isCurrent}
                  onCheckedChange={(checked) =>
                    setNewExperience({ ...newExperience, isCurrent: checked })
                  }
                />
                <Label>I currently work here</Label>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your role and responsibilities..."
                  value={newExperience.description}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, description: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  placeholder="React, Node.js, TypeScript..."
                  value={newExperience.technologies}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, technologies: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateExperience}>Add Experience</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {filteredExperiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      {exp.isCurrent && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteExperience(exp.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No experiences found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExperiencesSection;

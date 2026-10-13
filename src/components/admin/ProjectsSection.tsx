"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Project,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useReorderProjectsMutation,
  useUpdateProjectMutation,
} from "@/store/api/apiSlice";
import {
  Check,
  ChevronDown,
  Edit,
  ExternalLink,
  FolderOpen,
  Github,
  GripVertical,
  Home,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AiImportDialog from "./projects/AiImportDialog";
import ProjectEditor, { emptyProject } from "./projects/ProjectEditor";
import type { Draft } from "./projects/fields";

type View =
  | { kind: "list" }
  | { kind: "editor"; mode: "create" | "edit"; initial: Draft; fromAi?: boolean; key: number };

const STATUS_OPTIONS = [
  { value: "live", label: "Live", hint: "Shows a red “Live” pill" },
  { value: "in-progress", label: "In progress", hint: "Shows a “Now Building” pill" },
  { value: "concept", label: "Concept", hint: "Not built yet" },
  { value: "archived", label: "Archived", hint: "No longer maintained" },
];

const STATUS_STYLE: Record<string, string> = {
  live: "bg-green-500/10 text-green-600",
  "in-progress": "bg-yellow-500/10 text-yellow-600",
  concept: "bg-gray-500/10 text-gray-500",
  archived: "bg-gray-500/10 text-gray-500",
};

/* ------------------------------------------------------------------ */
/* One draggable row                                                   */
/* ------------------------------------------------------------------ */

interface RowProps {
  project: Project;
  position: number; // 1-based serial in the saved order
  dragDisabled: boolean;
  homeBusy: boolean;
  statusBusy: boolean;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleHome: (next: boolean) => void;
  onChangeStatus: (next: string) => void;
}

const SortableProjectRow = ({
  project,
  position,
  dragDisabled,
  homeBusy,
  statusBusy,
  deleting,
  onEdit,
  onDelete,
  onToggleHome,
  onChangeStatus,
}: RowProps) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
    disabled: dragDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? "relative z-10" : "relative"}
    >
      <Card
        className={`bg-card/50 border-border/50 transition-shadow ${
          isDragging ? "shadow-xl ring-2 ring-primary/40 bg-card" : "hover:border-primary/30"
        }`}
      >
        <CardContent className="flex items-center gap-2 sm:gap-3 p-3">
          {/* Drag handle + serial number */}
          <button
            ref={setActivatorNodeRef}
            type="button"
            {...attributes}
            {...listeners}
            disabled={dragDisabled}
            aria-label={`Drag to reorder ${project.title}`}
            title={dragDisabled ? "Clear the search to reorder" : "Drag to reorder"}
            className={`touch-none shrink-0 rounded p-1 text-muted-foreground ${
              dragDisabled ? "opacity-30 cursor-not-allowed" : "cursor-grab active:cursor-grabbing hover:bg-muted hover:text-foreground"
            }`}
          >
            <GripVertical className="w-5 h-5" />
          </button>
          <span className="w-7 shrink-0 text-center font-mono text-sm text-muted-foreground">{String(position).padStart(2, "0")}</span>

          <div className="hidden sm:block w-24 aspect-video shrink-0 overflow-hidden rounded bg-muted">
            <img src={project.media?.banner || project.media?.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-medium">{project.title}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={statusBusy}>
                  <button type="button" aria-label={`Change status of ${project.title} (currently ${project.status})`} title="Click to change status">
                    <Badge className={`cursor-pointer gap-1 text-[10px] ${STATUS_STYLE[project.status ?? ""] ?? ""}`}>
                      {statusBusy ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                      {project.status}
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </Badge>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {STATUS_OPTIONS.map((o) => (
                    <DropdownMenuItem key={o.value} onClick={() => o.value !== project.status && onChangeStatus(o.value)}>
                      <span className="flex flex-col">
                        <span className="flex items-center gap-2">
                          {o.label}
                          {o.value === project.status && <Check className="w-3.5 h-3.5 text-primary" />}
                        </span>
                        <span className="text-xs text-muted-foreground">{o.hint}</span>
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {project.visibility !== "public" && (
                <Badge variant="secondary" className="text-[10px] uppercase">
                  {project.visibility}
                </Badge>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              /{project.slug} · {project.type}
              {project.year ? ` · ${project.year}` : ""}
            </p>
          </div>

          {/* Show on homepage */}
          <label className="hidden md:flex shrink-0 items-center gap-2 text-xs text-muted-foreground" title="Show in the homepage Selected Work section">
            <Home className="w-3.5 h-3.5" />
            Home
            <Switch
              checked={!!project.meta?.featured}
              disabled={homeBusy}
              onCheckedChange={onToggleHome}
              aria-label={`Show ${project.title} on the homepage`}
            />
          </label>

          <div className="flex shrink-0 items-center gap-1">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={onEdit}>
              <Edit className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Edit</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More actions">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> View on site
                  </a>
                </DropdownMenuItem>
                {project.links?.github && (
                  <DropdownMenuItem asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </a>
                  </DropdownMenuItem>
                )}
                {/* The switch above is hidden on small screens; keep the action reachable here. */}
                <DropdownMenuItem className="md:hidden" onClick={() => onToggleHome(!project.meta?.featured)}>
                  <Home className="w-4 h-4 mr-2" /> {project.meta?.featured ? "Remove from homepage" : "Show on homepage"}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" disabled={deleting} onClick={onDelete}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const ProjectsSection = () => {
  const { toast } = useToast();
  // includeHidden lets the admin see (and edit) private projects the public site never receives.
  const { data: projects = [], isLoading, error } = useGetProjectsQuery({ includeHidden: true }, { refetchOnMountOrArgChange: true });
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [reorderProjects, { isLoading: isReordering }] = useReorderProjectsMutation();

  const [view, setView] = useState<View>({ kind: "list" });
  const [aiOpen, setAiOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [homeBusyId, setHomeBusyId] = useState<string | null>(null);
  const [statusBusyId, setStatusBusyId] = useState<string | null>(null);

  // Local order of ids: updated instantly on drop, then saved; otherwise follows the server.
  // The sync effect depends ONLY on the server's order, and is skipped while a save is in flight, so
  // neither a rollback nor an in-progress save can be overwritten by stale server data.
  const [order, setOrder] = useState<string[]>([]);
  const savesInFlight = useRef(0);
  const serverOrderKey = projects.map((p) => p.id).join();
  useEffect(() => {
    if (savesInFlight.current === 0) setOrder(serverOrderKey ? serverOrderKey.split(",") : []);
  }, [serverOrderKey]);

  const byId = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);
  const ordered = useMemo(() => order.map((id) => byId.get(id)).filter((p): p is Project => !!p), [order, byId]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "Couldn't load projects",
        description: "Make sure the backend is reachable and you're logged in.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // `key` forces a fresh editor (and fresh form state) every time one is opened.
  const openEditor = (mode: "create" | "edit", initial: Draft, fromAi = false) =>
    setView({ kind: "editor", mode, initial, fromAi, key: Date.now() });

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const previous = order;
    const next = arrayMove(order, order.indexOf(String(active.id)), order.indexOf(String(over.id)));
    setOrder(next); // optimistic
    savesInFlight.current += 1;
    try {
      await reorderProjects(next).unwrap();
    } catch (err) {
      setOrder(previous);
      const message = (err as { data?: { message?: string } })?.data?.message || "Failed to save the new order";
      toast({ title: "Order not saved", description: message, variant: "destructive" });
    } finally {
      savesInFlight.current -= 1;
    }
  };

  const handleToggleHome = async (project: Project, featured: boolean) => {
    setHomeBusyId(project.id);
    try {
      // Dotted path updates only this one field instead of replacing the whole meta object.
      await updateProject({ id: project.id, data: { "meta.featured": featured } as unknown as Partial<Project> }).unwrap();
      toast({ title: featured ? "Added to homepage" : "Removed from homepage", description: project.title });
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message || "Failed to update";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setHomeBusyId(null);
    }
  };

  const handleChangeStatus = async (project: Project, status: string) => {
    setStatusBusyId(project.id);
    try {
      await updateProject({ id: project.id, data: { status } as Partial<Project> }).unwrap();
      toast({ title: "Status updated", description: `${project.title} → ${status}` });
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message || "Failed to update status";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setStatusBusyId(null);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete “${project.title}”? This can't be undone.`)) return;
    try {
      await deleteProject(project.id).unwrap();
      toast({ title: "Project deleted" });
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message || "Failed to delete project";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  if (view.kind === "editor") {
    return (
      <ProjectEditor
        key={view.key}
        mode={view.mode}
        initial={view.initial}
        fromAi={view.fromAi}
        onCancel={() => setView({ kind: "list" })}
        onSaved={() => setView({ kind: "list" })}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const q = search.trim().toLowerCase();
  const visible = ordered.filter(
    (p) =>
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.techStack?.primary?.some((t) => t.toLowerCase().includes(q)),
  );
  const dragDisabled = q.length > 0;

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setAiOpen(true)}>
              <Sparkles className="w-4 h-4" /> Import with AI
            </Button>
            <Button className="gap-2" onClick={() => openEditor("create", emptyProject())}>
              <Plus className="w-4 h-4" /> Add project
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {projects.length} {projects.length === 1 ? "project" : "projects"} ·{" "}
          {dragDisabled
            ? "Clear the search to reorder."
            : "Drag the handle to reorder. This order is used on the homepage and the All Projects page; the Home switch picks what appears on the homepage."}
          {isReordering && <span className="ml-2 inline-flex items-center gap-1 text-xs"><Loader2 className="w-3 h-3 animate-spin" /> Saving…</span>}
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={visible.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {visible.map((project) => (
                <SortableProjectRow
                  key={project.id}
                  project={project}
                  position={order.indexOf(project.id) + 1}
                  dragDisabled={dragDisabled}
                  homeBusy={homeBusyId === project.id}
                  statusBusy={statusBusyId === project.id}
                  deleting={isDeleting}
                  onEdit={() => openEditor("edit", project as unknown as Draft)}
                  onDelete={() => handleDelete(project)}
                  onToggleHome={(next) => handleToggleHome(project, next)}
                  onChangeStatus={(next) => handleChangeStatus(project, next)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {visible.length === 0 && (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {q ? "No projects match your search" : "No projects yet — add one manually or import it with AI."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <AiImportDialog open={aiOpen} onOpenChange={setAiOpen} onGenerated={(draft) => openEditor("create", draft, true)} />
    </>
  );
};

export default ProjectsSection;

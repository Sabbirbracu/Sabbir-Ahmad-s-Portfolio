"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCreateProjectMutation, useUpdateProjectMutation } from "@/store/api/apiSlice";
import { ArrowLeft, Loader2, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { GalleryField, ImageField } from "./ImageFields";
import {
  Draft,
  DraftProvider,
  Grid,
  Group,
  ListField,
  ObjectListField,
  SelectField,
  SwitchField,
  TextField,
} from "./fields";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const TYPE_OPTIONS = [
  { value: "fullstack", label: "Full Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
  { value: "ai-ml", label: "AI / ML" },
  { value: "wordpress", label: "WordPress" },
  { value: "no-code", label: "No-Code" },
  { value: "research", label: "Research" },
  { value: "open-source", label: "Open Source" },
];

const STATUS_OPTIONS = [
  { value: "concept", label: "Concept" },
  { value: "in-progress", label: "In progress (shows “Now Building”)" },
  { value: "live", label: "Live" },
  { value: "archived", label: "Archived" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public" },
  { value: "nda", label: "NDA (public, with confidentiality note)" },
  { value: "private", label: "Private (admin only, hidden from the site)" },
];

const TRACK_OPTIONS = [
  { value: "sourcing", label: "Sourcing" },
  { value: "finance", label: "Finance" },
];

const STACK_CATEGORIES: [string, string][] = [
  ["primary", "Primary (shown on cards)"],
  ["frontend", "Frontend"],
  ["backend", "Backend"],
  ["database", "Database"],
  ["aiMl", "AI / ML"],
  ["realtime", "Realtime"],
  ["devops", "DevOps"],
  ["tools", "Tools"],
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const isBlank = (v: any): boolean =>
  v == null ||
  v === "" ||
  (Array.isArray(v) && v.every(isBlank)) ||
  (typeof v === "object" && !Array.isArray(v) && Object.values(v).every(isBlank));

// Drops empty rows from every list (e.g. a half-added "challenge") but keeps scalar fields as-is,
// so clearing a text field on edit really clears it in the database.
const prune = (v: any): any =>
  Array.isArray(v)
    ? v.filter((item) => !isBlank(item)).map(prune)
    : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, prune(x)]))
      : v;

const validate = (d: Draft): string[] => {
  const errors: string[] = [];
  if (!d.title?.trim()) errors.push("Title is required");
  if (!d.slug?.trim()) errors.push("Slug is required");
  else if (!/^[a-z0-9-]+$/.test(d.slug)) errors.push("Slug may only contain lowercase letters, numbers and hyphens");
  if (!d.description?.trim()) errors.push("Description is required");
  if (!d.type) errors.push("Project type is required");
  return errors;
};

export const emptyProject = (): Draft => ({
  title: "",
  slug: "",
  tagline: "",
  description: "",
  type: "fullstack",
  status: "live",
  visibility: "public",
  year: new Date().getFullYear(),
  duration: "",
  media: { banner: "", thumbnail: "", gallery: [], videoDemo: "" },
  links: {},
  techStack: {},
  summaryMetrics: {},
  caseStudy: {},
  meta: { featured: false, order: 0, tags: [] },
});

/* ------------------------------------------------------------------ */
/* Editor                                                              */
/* ------------------------------------------------------------------ */

interface ProjectEditorProps {
  initial: Draft;
  mode: "create" | "edit";
  /** Draft came from the AI importer and hasn't been saved yet. */
  fromAi?: boolean;
  onCancel: () => void;
  onSaved: () => void;
}

const ProjectEditor = ({ initial, mode, fromAi, onCancel, onSaved }: ProjectEditorProps) => {
  const { toast } = useToast();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Merge over an empty project so every nested object exists for the path-bound fields.
  const [draft, setDraft] = useState<Draft>(() => {
    const base = emptyProject();
    return {
      ...base,
      ...initial,
      media: { ...base.media, ...initial.media },
      meta: { ...base.meta, ...initial.meta },
    };
  });
  const [slugTouched, setSlugTouched] = useState(mode === "edit" || !!initial.slug);
  const [errors, setErrors] = useState<string[]>([]);

  const saving = isCreating || isUpdating;

  const handleChange = (next: Draft) => {
    let value = next;
    if (next.slug !== draft.slug) {
      value = { ...value, slug: next.slug.toLowerCase().replace(/\s+/g, "-") };
      setSlugTouched(true);
    } else if (mode === "create" && !slugTouched && next.title !== draft.title) {
      value = { ...value, slug: slugify(next.title) };
    }
    setDraft(value);
  };

  const save = async () => {
    const problems = validate(draft);
    setErrors(problems);
    if (problems.length) {
      toast({ title: "Fix these first", description: problems.join(" · "), variant: "destructive" });
      return;
    }

    const payload = prune(draft);
    try {
      if (mode === "edit") {
        await updateProject({ id: draft.id, data: payload }).unwrap();
        toast({ title: "Project updated" });
      } else {
        await createProject(payload).unwrap();
        toast({ title: "Project created" });
      }
      onSaved();
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message || "Failed to save project";
      toast({ title: "Could not save", description: message, variant: "destructive" });
    }
  };

  return (
    <DraftProvider draft={draft} onChange={handleChange}>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="sm" className="gap-1.5" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h2 className="text-lg font-semibold truncate">
            {mode === "edit" ? `Edit: ${initial.title || "project"}` : "New project"}
          </h2>
        </div>

        {fromAi && (
          <div className="flex gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
            <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <p>
              <strong>AI draft — not saved yet.</strong> Review every tab (the AI only used what you pasted, so some
              sections may be empty), add your images on the <em>Media</em> tab, then press <em>Save project</em>.
            </p>
          </div>
        )}

        <Tabs defaultValue="basics">
          <TabsList className="h-auto flex-wrap justify-start">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="tech">Tech &amp; metrics</TabsTrigger>
            <TabsTrigger value="case">Case study</TabsTrigger>
            <TabsTrigger value="depth">In-depth</TabsTrigger>
          </TabsList>

          {/* ---------------- Basics ---------------- */}
          <TabsContent value="basics" className="space-y-4 mt-4">
            <Group title="Identity">
              <Grid>
                <TextField path="title" label="Title" required placeholder="e.g. Shaadimart BD" />
                <TextField
                  path="slug"
                  label="Slug"
                  required
                  placeholder="shaadimart-bd"
                  hint={mode === "edit" ? "Changing this changes the project's URL." : "Used in the URL: /projects/<slug>"}
                />
              </Grid>
              <TextField path="tagline" label="Tagline" placeholder="One short line under the title" />
              <TextField
                path="description"
                label="Description"
                required
                multiline
                rows={4}
                hint="Shown on project cards and the homepage."
              />
            </Group>

            <Group title="Classification">
              <Grid cols={3}>
                <SelectField path="type" label="Type" required options={TYPE_OPTIONS} />
                <SelectField path="status" label="Status" options={STATUS_OPTIONS} />
                <SelectField path="visibility" label="Visibility" options={VISIBILITY_OPTIONS} />
              </Grid>
              <Grid>
                <TextField path="year" label="Year" type="number" placeholder="2025" />
                <TextField path="duration" label="Duration" placeholder="e.g. 4 months" />
              </Grid>
            </Group>

            <Group title="Details" description="Optional context shown in the case study and used for filtering.">
              <Grid>
                <TextField path="meta.company" label="Company / client" />
                <TextField path="meta.location" label="Location" />
              </Grid>
              <ListField path="meta.tags" mode="tags" label="Tags" placeholder="SaaS, Marketplace, Bangladesh" />
              <TextField
                path="meta.confidentialityNote"
                label="Confidentiality note"
                multiline
                rows={2}
                hint="Shown when visibility is NDA."
              />
              <SwitchField
                path="meta.featured"
                label="Show on homepage"
                hint="Order is set by dragging projects in the project list."
              />
            </Group>
          </TabsContent>

          {/* ---------------- Media ---------------- */}
          <TabsContent value="media" className="space-y-4 mt-4">
            <Group title="Images" description="Upload to your storage or paste a URL. Slug is used as the upload folder, so set it first.">
              <ImageField path="media.banner" label="Banner" hint="Main image — shown first on cards and the homepage slider." />
              <ImageField path="media.thumbnail" label="Thumbnail (optional)" />
              <GalleryField path="media.gallery" label="Gallery" hint="Extra screenshots, in display order." />
              <TextField path="media.videoDemo" label="Video demo URL" type="url" placeholder="https://…" />
            </Group>
          </TabsContent>

          {/* ---------------- Links ---------------- */}
          <TabsContent value="links" className="space-y-4 mt-4">
            <Group title="Links">
              <Grid>
                <TextField path="links.live" label="Live site" type="url" placeholder="https://" />
                <TextField path="links.clientSite" label="Client's own site" type="url" hint="When it differs from the delivered build." />
                <TextField path="links.github" label="GitHub" type="url" placeholder="https://github.com/…" />
                <TextField path="links.documentation" label="Documentation" type="url" />
                <TextField path="links.researchPaper" label="Research paper" type="url" />
                <TextField path="links.figma" label="Figma" type="url" />
              </Grid>
            </Group>
          </TabsContent>

          {/* ---------------- Tech & metrics ---------------- */}
          <TabsContent value="tech" className="space-y-4 mt-4">
            <Group title="Tech stack" description="Comma-separated lists. “Primary” is what appears on cards.">
              <Grid>
                {STACK_CATEGORIES.map(([key, label]) => (
                  <ListField key={key} path={`techStack.${key}`} mode="tags" label={label} placeholder="Next.js, Node.js" />
                ))}
              </Grid>
            </Group>
            <Group title="Summary metrics" description="Short, true statements — leave blank if you don't have a real number.">
              <Grid>
                <TextField path="summaryMetrics.users" label="Users" placeholder="e.g. 2,000 registered" />
                <TextField path="summaryMetrics.scale" label="Scale" />
                <TextField path="summaryMetrics.performance" label="Performance" />
                <TextField path="summaryMetrics.impact" label="Impact" />
              </Grid>
            </Group>
          </TabsContent>

          {/* ---------------- Case study ---------------- */}
          <TabsContent value="case" className="space-y-4 mt-4">
            <Group title="Overview">
              <Grid cols={3}>
                <TextField path="caseStudy.role" label="Your role" />
                <TextField path="caseStudy.teamSize" label="Team size" type="number" />
                <TextField path="caseStudy.targetUsers" label="Target users" />
              </Grid>
              <TextField path="caseStudy.problem" label="Problem" multiline rows={3} />
              <TextField path="caseStudy.solution" label="Solution" multiline rows={3} />
              <ListField path="caseStudy.features" label="Key features" rows={6} />
              <TextField path="caseStudy.architecture" label="Architecture (summary)" multiline rows={3} />
            </Group>

            <Group title="Delivery">
              <ObjectListField
                path="caseStudy.challenges"
                label="Challenges"
                itemName="Challenge"
                fields={[
                  { key: "problem", label: "Problem", kind: "textarea" },
                  { key: "solution", label: "Solution", kind: "textarea" },
                ]}
              />
              <ListField path="caseStudy.contribution" label="Your contribution" />
              <TextField path="caseStudy.outcome" label="Outcome" multiline rows={3} />
              <ListField path="caseStudy.learnings" label="Learnings" />
              <TextField
                path="caseStudy.showcaseNote"
                label="Showcase note"
                multiline
                rows={2}
                hint="Explains a delivered-build URL vs the client's production URL."
              />
            </Group>
          </TabsContent>

          {/* ---------------- In-depth ---------------- */}
          <TabsContent value="depth" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Optional long-form blocks. Each one only appears on the project page if you fill it in.
            </p>

            <Group title="Executive summary & headline metrics">
              <TextField path="caseStudy.executiveSummary.intro" label="Summary intro" multiline rows={3} />
              <ListField path="caseStudy.executiveSummary.points" label="Summary points" />
              <ObjectListField
                path="caseStudy.keyMetrics"
                label="Headline metrics"
                itemName="Metric"
                fields={[
                  { key: "value", label: "Value", placeholder: "e.g. 40%" },
                  { key: "label", label: "Label", placeholder: "e.g. faster checkout" },
                ]}
              />
            </Group>

            <Group title="Context & constraints">
              <ListField path="caseStudy.context" mode="paragraphs" label="Context" rows={6} />
              <TextField path="caseStudy.challengeIntro" label="Challenge intro" multiline rows={2} />
              <ListField path="caseStudy.challengePoints" label="Challenge points" />
              <ListField path="caseStudy.constraints" label="Constraints" />
            </Group>

            <Group
              title="Lifecycle diagram"
              description="The end-to-end stages shown as two tracks. List sourcing stages first, then finance stages."
            >
              <TextField path="caseStudy.workflow.intro" label="Lifecycle intro" multiline rows={2} />
              <ObjectListField
                path="caseStudy.workflow.stages"
                label="Stages"
                itemName="Stage"
                fields={[
                  { key: "title", label: "Title" },
                  { key: "detail", label: "Detail", kind: "textarea" },
                  { key: "track", label: "Track", kind: "select", options: TRACK_OPTIONS },
                  { key: "ai", label: "AI-assisted", kind: "switch" },
                  { key: "human", label: "A person approves here", kind: "switch" },
                ]}
              />
              <TextField path="caseStudy.workflow.outro" label="Lifecycle outro" multiline rows={2} />
            </Group>

            <Group
              title="Product tour"
              description="Captioned screenshots, shown in order between Approach and Architecture. A screen with no image is hidden, so write the captions first and add images as you capture them."
            >
              <TextField path="caseStudy.screensIntro" label="Tour intro" multiline rows={2} />
              <ObjectListField
                path="caseStudy.screens"
                label="Screens"
                itemName="Screen"
                fields={[
                  { key: "title", label: "Title" },
                  { key: "caption", label: "Caption", kind: "textarea" },
                  { key: "image", label: "Screenshot", kind: "image", placeholder: "Anonymise names, prices and emails first." },
                ]}
              />
            </Group>

            <Group title="Approach">
              <TextField path="caseStudy.approachIntro" label="Approach intro" multiline rows={2} />
              <ObjectListField
                path="caseStudy.approachSteps"
                label="Steps"
                itemName="Step"
                fields={[
                  { key: "title", label: "Title" },
                  { key: "body", label: "Body", kind: "textarea" },
                ]}
              />
              <TextField path="caseStudy.approachOutro" label="Approach outro" multiline rows={2} />
            </Group>

            <Group title="Architecture">
              <TextField path="caseStudy.architectureIntro" label="Architecture intro" multiline rows={2} />
              <ObjectListField
                path="caseStudy.architectureComponents"
                label="Components"
                itemName="Component"
                fields={[
                  { key: "name", label: "Name" },
                  { key: "detail", label: "Detail", kind: "textarea" },
                ]}
              />
              <TextField path="caseStudy.architectureOutro" label="Architecture outro" multiline rows={2} />
              <ObjectListField
                path="caseStudy.architectureNotes"
                label="Notes"
                itemName="Note"
                hint="e.g. “Access model: 2 roles, 4 tiers”"
                fields={[
                  { key: "title", label: "Title" },
                  { key: "body", label: "Points", kind: "lines" },
                ]}
              />
            </Group>

            <Group title="Problems solved">
              <ObjectListField
                path="caseStudy.deepDives"
                label="Deep dives"
                itemName="Section"
                fields={[
                  { key: "title", label: "Title" },
                  { key: "paragraphs", label: "Paragraphs", kind: "paragraphs" },
                ]}
              />
              <ObjectListField
                path="caseStudy.tradeoffs"
                label="Trade-offs"
                itemName="Trade-off"
                fields={[
                  { key: "decision", label: "Decision" },
                  { key: "alternative", label: "Alternative considered" },
                  { key: "rationale", label: "Rationale", kind: "textarea" },
                ]}
              />
            </Group>

            <Group title="Security & deployment">
              <TextField path="caseStudy.security.intro" label="Security intro" multiline rows={2} />
              <ListField path="caseStudy.security.points" label="Security points" />
              <TextField path="caseStudy.deployment.intro" label="Deployment intro" multiline rows={2} />
              <ListField path="caseStudy.deployment.points" label="Deployment points" />
            </Group>

            <Group title="Results & reflection">
              <ObjectListField
                path="caseStudy.results.metrics"
                label="Result metrics"
                itemName="Metric"
                fields={[
                  { key: "label", label: "Label" },
                  { key: "value", label: "Value" },
                ]}
              />
              <TextField path="caseStudy.results.modulesNote" label="Modules note" multiline rows={2} />
              <ListField path="caseStudy.results.businessImpact" label="Business impact" />
              <ListField path="caseStudy.improvements" label="What I'd do differently" />
              <ListField path="caseStudy.reflection" mode="paragraphs" label="Closing reflection" rows={5} />
            </Group>
          </TabsContent>
        </Tabs>

        {errors.length > 0 && (
          <ul className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive list-disc list-inside">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <div className="sticky bottom-0 -mx-1 flex justify-end gap-2 border-t border-border bg-background/95 px-1 py-3 backdrop-blur">
          <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="button" onClick={save} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {mode === "edit" ? "Save changes" : "Save project"}
          </Button>
        </div>
      </div>
    </DraftProvider>
  );
};

export default ProjectEditor;

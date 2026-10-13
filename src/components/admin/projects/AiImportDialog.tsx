"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useGenerateProjectDraftMutation } from "@/store/api/apiSlice";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Draft } from "./fields";

const MAX_CHARS = 60_000;

interface AiImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerated: (draft: Draft) => void;
}

const AiImportDialog = ({ open, onOpenChange, onGenerated }: AiImportDialogProps) => {
  const { toast } = useToast();
  const [generate, { isLoading }] = useGenerateProjectDraftMutation();
  const [notes, setNotes] = useState("");

  const run = async () => {
    try {
      const draft = await generate(notes).unwrap();
      setNotes("");
      onOpenChange(false);
      onGenerated(draft as Draft);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message || "Generation failed — please try again";
      toast({ title: "Couldn't generate the project", description: message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isLoading && onOpenChange(next)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Import a project with AI
          </DialogTitle>
          <DialogDescription>
            Paste everything you know about the project — a README, notes, or the summary from your coding agent. The AI
            fills in the whole case study from it. Nothing is saved until you review and press Save.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={14}
            disabled={isLoading}
            placeholder="What it is, who it's for, what you built, the stack, key features, challenges, results, links…"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>The AI only uses what you paste — it won't invent metrics or links. Images are added by you afterwards.</span>
            <span className={notes.length > MAX_CHARS ? "text-destructive" : ""}>
              {notes.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={run} disabled={isLoading || notes.trim().length < 40 || notes.length > MAX_CHARS} className="gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating — up to 2 minutes…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate project
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiImportDialog;

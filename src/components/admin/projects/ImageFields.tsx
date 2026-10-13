"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, X } from "lucide-react";
import { useRef } from "react";
import { getIn, useDraft } from "./fields";
import { folderFor, ImageInput, useImageUpload } from "./ImageInput";

/* ---------------- single image (banner, thumbnail) ---------------- */

export const ImageField = ({ path, label, hint }: { path: string; label: string; hint?: string }) => {
  const { draft, set } = useDraft();
  const value: string = getIn(draft, path) ?? "";

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <ImageInput value={value} onChange={(url) => set(path, url)} folder={folderFor(draft.slug)} hint={hint} />
    </div>
  );
};

/* ---------------- gallery (string[]) ---------------- */

export const GalleryField = ({ path, label, hint }: { path: string; label: string; hint?: string }) => {
  const { draft, set } = useDraft();
  const urls: string[] = getIn(draft, path) ?? [];
  const { upload, isUploading } = useImageUpload(folderFor(draft.slug));
  const input = useRef<HTMLInputElement>(null);

  const onPick = async (files: FileList | null) => {
    if (!files) return;
    const added = await upload(files);
    if (added.length) set(path, [...urls, ...added]);
    if (input.current) input.current.value = "";
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= urls.length) return;
    const next = [...urls];
    [next[index], next[target]] = [next[target], next[index]];
    set(path, next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Label>{label}</Label>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div>
          <input ref={input} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onPick(e.target.files)} />
          <Button type="button" size="sm" variant="outline" className="gap-1.5" disabled={isUploading} onClick={() => input.current?.click()}>
            {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
            Upload images
          </Button>
        </div>
      </div>

      {urls.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">No gallery images yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {urls.map((url, index) => (
            <div key={`${url}-${index}`} className="group relative aspect-video overflow-hidden rounded-md border border-border/60 bg-muted">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <span className="absolute top-1 left-1 rounded bg-background/90 px-1.5 font-mono text-[10px]">{index + 1}</span>
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-background/90 p-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <div className="flex">
                  <Button type="button" size="icon" variant="ghost" className="h-6 w-6" disabled={index === 0} onClick={() => move(index, -1)}>
                    <ArrowLeft className="w-3 h-3" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost" className="h-6 w-6" disabled={index === urls.length - 1} onClick={() => move(index, 1)}>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
                <Button type="button" size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => set(path, urls.filter((_, i) => i !== index))}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

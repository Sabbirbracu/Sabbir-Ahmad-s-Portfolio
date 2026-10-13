"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUploadMediaMutation } from "@/store/api/apiSlice";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef } from "react";

// Uploads files to the backend (-> Cloudflare R2) and resolves to their public URLs.
export const useImageUpload = (folder: string) => {
  const { toast } = useToast();
  const [uploadMedia, { isLoading }] = useUploadMediaMutation();

  const upload = async (files: FileList | File[]): Promise<string[]> => {
    const list = Array.from(files);
    if (list.length === 0) return [];
    const form = new FormData();
    list.forEach((f) => form.append("files", f));
    form.append("folder", folder);
    try {
      const res = await uploadMedia(form).unwrap();
      return res.data.map((f) => f.url);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message || "Upload failed";
      toast({ title: "Upload failed", description: message, variant: "destructive" });
      return [];
    }
  };

  return { upload, isUploading: isLoading };
};

export const folderFor = (slug?: string) => `projects/${(slug || "unsorted").replace(/[^a-z0-9-]/g, "")}`;

/** A single image: preview, URL box, upload and remove. Controlled, so it works for fields and for list items. */
export const ImageInput = ({
  value,
  onChange,
  folder,
  hint,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  hint?: string;
}) => {
  const { upload, isUploading } = useImageUpload(folder);
  const input = useRef<HTMLInputElement>(null);

  const onPick = async (files: FileList | null) => {
    if (!files) return;
    const [url] = await upload(files);
    if (url) onChange(url);
    if (input.current) input.current.value = "";
  };

  return (
    <div className="flex gap-3">
      <div className="w-40 aspect-video shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted flex items-center justify-center">
        {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <ImagePlus className="w-6 h-6 text-muted-foreground" />}
      </div>
      <div className="flex-1 space-y-2 min-w-0">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste an image URL, or upload →" />
        <div className="flex gap-2">
          <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => onPick(e.target.files)} />
          <Button type="button" size="sm" variant="outline" className="gap-1.5" disabled={isUploading} onClick={() => input.current?.click()}>
            {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
            Upload
          </Button>
          {value && (
            <Button type="button" size="sm" variant="ghost" className="gap-1.5 text-destructive" onClick={() => onChange("")}>
              <X className="w-3.5 h-3.5" /> Remove
            </Button>
          )}
        </div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
};

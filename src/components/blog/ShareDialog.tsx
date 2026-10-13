"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { buildShareTargets, isMobileDevice, type ShareTarget, type ShareTargetId } from "@/lib/share";
import { Check, Copy, Facebook, Instagram, Link2, Linkedin, Mail, MessageCircle, MessageCircleMore, Send, Share2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
}

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Brand colours on a round button. Icons come from the icon set already in the project.
const BRAND: Record<ShareTargetId, { bg: string; icon: ReactNode }> = {
  facebook: { bg: "bg-[#1877F2]", icon: <Facebook className="h-6 w-6" /> },
  whatsapp: { bg: "bg-[#25D366]", icon: <MessageCircle className="h-6 w-6" /> },
  x: { bg: "bg-black", icon: <XLogo className="h-5 w-5" /> },
  linkedin: { bg: "bg-[#0A66C2]", icon: <Linkedin className="h-6 w-6" /> },
  messenger: { bg: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF]", icon: <MessageCircleMore className="h-6 w-6" /> },
  gmail: { bg: "bg-[#EA4335]", icon: <Mail className="h-6 w-6" /> },
  telegram: { bg: "bg-[#26A5E4]", icon: <Send className="h-6 w-6" /> },
  instagram: { bg: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]", icon: <Instagram className="h-6 w-6" /> },
};

const tile = "group flex flex-col items-center gap-2 rounded-xl p-2 text-center outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring";
const badge = "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:scale-105";

const ShareDialog = ({ open, onOpenChange, title, description }: ShareDialogProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [mobile, setMobile] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // Read the address only on the client, and only when the dialog opens.
  useEffect(() => {
    if (!open) return;
    setUrl(window.location.href.split("#")[0]);
    setMobile(isMobileDevice(navigator.userAgent));
    setCanNativeShare(typeof navigator.share === "function");
    setCopied(false);
  }, [open]);

  const copyLink = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      // Clipboard access can be blocked (insecure origin, permissions); fall back to selecting the text.
      const input = document.getElementById("share-url") as HTMLInputElement | null;
      input?.select();
      return document.execCommand?.("copy") ?? false;
    }
  };

  const handleCopy = async () => {
    const ok = await copyLink();
    setCopied(ok);
    toast(ok ? { title: "Link copied", description: "The article link is on your clipboard." } : { title: "Couldn't copy", description: "Select the link and copy it manually.", variant: "destructive" });
    if (ok) setTimeout(() => setCopied(false), 2000);
  };

  // Platforms with no web share URL: copy, explain, then open the app so the user can paste.
  const handleCopyThenOpen = async (target: ShareTarget) => {
    const ok = await copyLink();
    toast({ title: ok ? "Link copied" : "Couldn't copy the link", description: ok ? target.copyHint : "Select the link below and copy it manually." });
    if (ok && target.openAfterCopy) window.open(target.openAfterCopy, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text: description, url });
      onOpenChange(false);
    } catch {
      // The person closed the system share sheet.
    }
  };

  const targets = url ? buildShareTargets({ url, title, description }, mobile) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" /> Share this article
          </DialogTitle>
          <DialogDescription className="line-clamp-2">{title}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-1 py-2">
          {targets.map((t) => {
            const brand = BRAND[t.id];
            const content = (
              <>
                <span className={`${badge} ${brand.bg}`}>{brand.icon}</span>
                <span className="text-xs font-medium text-foreground/80">{t.label}</span>
              </>
            );
            return t.href ? (
              <a
                key={t.id}
                href={t.href}
                target={t.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={tile}
                aria-label={`Share on ${t.label}`}
                onClick={() => onOpenChange(false)}
              >
                {content}
              </a>
            ) : (
              <button key={t.id} type="button" className={tile} aria-label={`Share on ${t.label} (copies the link)`} onClick={() => handleCopyThenOpen(t)}>
                {content}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Or copy the link</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="share-url" readOnly value={url} onFocus={(e) => e.currentTarget.select()} className="pl-9 text-sm" aria-label="Article link" />
            </div>
            <Button type="button" onClick={handleCopy} className="gap-2 shrink-0">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          {canNativeShare && (
            <Button type="button" variant="outline" className="mt-1 w-full gap-2" onClick={handleNativeShare}>
              <Share2 className="h-4 w-4" /> More options…
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;

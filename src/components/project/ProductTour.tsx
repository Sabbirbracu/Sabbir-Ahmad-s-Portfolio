"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { CaseStudyScreen } from "@/types/project";

/**
 * Captioned product-tour screenshots. Screens without an image are skipped, so the section can be
 * shipped with the written captions and filled in later from the admin panel. Click a screenshot to
 * open it full size, because dense ERP screens are unreadable when scaled down.
 */

const BrowserFrame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-xl border border-border bg-white shadow-xl">
    <div className="flex items-center gap-2 border-b border-border bg-[hsl(78_20%_96%)] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(0_70%_65%)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(42_88%_58%)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(140_50%_52%)]" />
      <span className="ml-3 truncate font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{title}</span>
    </div>
    {children}
  </div>
);

export const hasTourImages = (screens?: CaseStudyScreen[]) => !!screens?.some((s) => s.image);

const ProductTour = ({ screens }: { screens: CaseStudyScreen[] }) => {
  const [open, setOpen] = useState<CaseStudyScreen | null>(null);
  const visible = screens.filter((s) => s.image);

  return (
    <>
      <div className="space-y-16 md:space-y-24">
        {visible.map((s, i) => {
          const flipped = i % 2 === 1;
          return (
            <motion.div
              key={`${s.title}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={`lg:col-span-8 ${flipped ? "lg:order-2" : ""}`}>
                <BrowserFrame title={s.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(s)}
                    className="group relative block w-full cursor-zoom-in text-left"
                    aria-label={`Open ${s.title} full size`}
                  >
                    <img src={s.image} alt={s.title} loading="lazy" className="block h-auto w-full" />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-foreground/80 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 className="h-3 w-3" /> Full size
                    </span>
                  </button>
                </BrowserFrame>
              </div>

              <div className={`lg:col-span-4 ${flipped ? "lg:order-1" : ""}`}>
                <p className="mb-3 font-mono text-[11px] tracking-[0.18em] uppercase font-bold text-[hsl(160_62%_40%)]">
                  Screen {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-2xl font-extrabold leading-snug tracking-tight text-foreground md:text-3xl">
                  {s.title}
                </h3>
                {s.caption && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{s.caption}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[92vh] w-[96vw] max-w-[96vw] overflow-auto border-0 bg-white p-2 sm:rounded-xl md:p-3 lg:max-w-[1400px]">
          <DialogTitle className="sr-only">{open?.title}</DialogTitle>
          <DialogDescription className="sr-only">{open?.caption ?? "Full-size screenshot"}</DialogDescription>
          {open && <img src={open.image} alt={open.title} className="block h-auto w-full rounded-md" />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductTour;

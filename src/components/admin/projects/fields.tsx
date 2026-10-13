"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { folderFor, ImageInput } from "./ImageInput";

/* ------------------------------------------------------------------ */
/* Draft state: a nested Project object edited by dotted path          */
/* ------------------------------------------------------------------ */

export type Draft = Record<string, any>;

export const getIn = (obj: Draft, path: string) =>
  path.split(".").reduce<any>((acc, key) => (acc == null ? undefined : acc[key]), obj);

export const setIn = (obj: Draft, path: string, value: unknown): Draft => {
  const [head, ...rest] = path.split(".");
  return {
    ...obj,
    [head]: rest.length ? setIn((obj?.[head] as Draft) ?? {}, rest.join("."), value) : value,
  };
};

interface DraftContextValue {
  draft: Draft;
  set: (path: string, value: unknown) => void;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export const DraftProvider = ({
  draft,
  onChange,
  children,
}: {
  draft: Draft;
  onChange: (next: Draft) => void;
  children: ReactNode;
}) => (
  <DraftContext.Provider value={{ draft, set: (path, value) => onChange(setIn(draft, path, value)) }}>
    {children}
  </DraftContext.Provider>
);

export const useDraft = () => {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("Field used outside <DraftProvider>");
  return ctx;
};

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

export const FieldShell = ({
  label,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className ?? ""}`}>
    <Label>
      {label}
      {required && <span className="text-destructive"> *</span>}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const Group = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <section className="space-y-4 rounded-lg border border-border/60 p-4">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
    </div>
    {children}
  </section>
);

export const Grid = ({ cols = 2, children }: { cols?: 2 | 3 | 4; children: ReactNode }) => (
  <div className={`grid grid-cols-1 gap-4 ${cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* List inputs (string[] <-> textarea) with local text state           */
/* ------------------------------------------------------------------ */

type ListMode = "lines" | "paragraphs" | "tags";

const parseList = (text: string, mode: ListMode): string[] => {
  const parts = mode === "tags" ? text.split(",") : mode === "paragraphs" ? text.split(/\n\s*\n/) : text.split("\n");
  return parts.map((p) => p.trim()).filter(Boolean);
};

const joinList = (items: string[], mode: ListMode) =>
  items.join(mode === "tags" ? ", " : mode === "paragraphs" ? "\n\n" : "\n");

const sameList = (a: string[], b: string[]) => a.length === b.length && a.every((v, i) => v === b[i]);

// The textarea keeps its own text so newlines/commas the user just typed aren't re-parsed away;
// it only re-syncs from `value` when that changed from outside (e.g. an AI draft was loaded).
export const ListInput = ({
  value,
  onChange,
  mode,
  rows = 4,
  placeholder,
}: {
  value: string[] | undefined;
  onChange: (next: string[]) => void;
  mode: ListMode;
  rows?: number;
  placeholder?: string;
}) => {
  const items = value ?? [];
  const [text, setText] = useState(() => joinList(items, mode));

  useEffect(() => {
    if (!sameList(parseList(text, mode), items)) setText(joinList(items, mode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handle = (next: string) => {
    setText(next);
    onChange(parseList(next, mode));
  };

  return mode === "tags" ? (
    <Input value={text} onChange={(e) => handle(e.target.value)} placeholder={placeholder} />
  ) : (
    <Textarea value={text} onChange={(e) => handle(e.target.value)} rows={rows} placeholder={placeholder} />
  );
};

/* ------------------------------------------------------------------ */
/* Path-bound fields                                                   */
/* ------------------------------------------------------------------ */

interface BaseProps {
  path: string;
  label: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export const TextField = ({
  path,
  multiline,
  rows = 3,
  type = "text",
  ...shell
}: BaseProps & { multiline?: boolean; rows?: number; type?: "text" | "url" | "number" }) => {
  const { draft, set } = useDraft();
  const value = getIn(draft, path) ?? "";
  return (
    <FieldShell {...shell}>
      {multiline ? (
        <Textarea value={value} onChange={(e) => set(path, e.target.value)} rows={rows} placeholder={shell.placeholder} />
      ) : (
        <Input
          type={type}
          value={value}
          placeholder={shell.placeholder}
          onChange={(e) => set(path, type === "number" ? (e.target.value === "" ? undefined : Number(e.target.value)) : e.target.value)}
        />
      )}
    </FieldShell>
  );
};

export const SelectField = ({
  path,
  options,
  ...shell
}: BaseProps & { options: { value: string; label: string }[] }) => {
  const { draft, set } = useDraft();
  return (
    <FieldShell {...shell}>
      <Select value={getIn(draft, path) ?? ""} onValueChange={(v) => set(path, v)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
};

export const SwitchField = ({ path, label, hint }: { path: string; label: string; hint?: string }) => {
  const { draft, set } = useDraft();
  return (
    <div className="flex items-start gap-3">
      <Switch checked={!!getIn(draft, path)} onCheckedChange={(v) => set(path, v)} />
      <div>
        <Label>{label}</Label>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
};

export const ListField = ({ path, mode = "lines", rows, ...shell }: BaseProps & { mode?: ListMode; rows?: number }) => {
  const { draft, set } = useDraft();
  const defaultHint = mode === "tags" ? "Comma-separated" : mode === "paragraphs" ? "Separate paragraphs with a blank line" : "One item per line";
  return (
    <FieldShell {...shell} hint={shell.hint ?? defaultHint}>
      <ListInput value={getIn(draft, path)} onChange={(v) => set(path, v)} mode={mode} rows={rows} placeholder={shell.placeholder} />
    </FieldShell>
  );
};

/* ------------------------------------------------------------------ */
/* Repeating groups: [{ a, b, c }, …]                                  */
/* ------------------------------------------------------------------ */

export interface ItemFieldSpec {
  key: string;
  label: string;
  kind?: "text" | "textarea" | "lines" | "paragraphs" | "image" | "select" | "switch";
  placeholder?: string;
  /** For kind "select" */
  options?: { value: string; label: string }[];
}

export const ObjectListField = ({
  path,
  label,
  hint,
  itemName,
  fields,
}: {
  path: string;
  label: string;
  hint?: string;
  itemName: string;
  fields: ItemFieldSpec[];
}) => {
  const { draft, set } = useDraft();
  const items: Draft[] = getIn(draft, path) ?? [];

  const update = (index: number, key: string, value: unknown) =>
    set(path, items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    set(path, next);
  };

  const blank = () =>
    Object.fromEntries(
      fields.map((f) => [
        f.key,
        f.kind === "lines" || f.kind === "paragraphs" ? [] : f.kind === "switch" ? false : f.kind === "select" ? f.options?.[0]?.value ?? "" : "",
      ])
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Label>{label}</Label>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <Button type="button" size="sm" variant="outline" className="gap-1" onClick={() => set(path, [...items, blank()])}>
          <Plus className="w-3.5 h-3.5" /> Add {itemName}
        </Button>
      </div>

      {items.length === 0 && <p className="text-xs text-muted-foreground italic">None yet.</p>}

      {items.map((item, index) => (
        <div key={index} className="rounded-md border border-border/60 bg-muted/20 p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {itemName} {index + 1}
            </span>
            <div className="flex gap-1">
              <Button type="button" size="icon" variant="ghost" className="h-7 w-7" disabled={index === 0} onClick={() => move(index, -1)}>
                <ArrowUp className="w-3.5 h-3.5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive"
                onClick={() => set(path, items.filter((_, i) => i !== index))}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {fields.map((f) => (
            <FieldShell key={f.key} label={f.label}>
              {f.kind === "lines" || f.kind === "paragraphs" ? (
                <ListInput
                  value={item[f.key]}
                  onChange={(v) => update(index, f.key, v)}
                  mode={f.kind}
                  rows={3}
                  placeholder={f.placeholder}
                />
              ) : f.kind === "textarea" ? (
                <Textarea value={item[f.key] ?? ""} rows={3} placeholder={f.placeholder} onChange={(e) => update(index, f.key, e.target.value)} />
              ) : f.kind === "image" ? (
                <ImageInput value={item[f.key] ?? ""} onChange={(url) => update(index, f.key, url)} folder={folderFor(draft.slug)} hint={f.placeholder} />
              ) : f.kind === "select" ? (
                <Select value={item[f.key] ?? ""} onValueChange={(v) => update(index, f.key, v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options?.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : f.kind === "switch" ? (
                <Switch checked={!!item[f.key]} onCheckedChange={(v) => update(index, f.key, v)} />
              ) : (
                <Input value={item[f.key] ?? ""} placeholder={f.placeholder} onChange={(e) => update(index, f.key, e.target.value)} />
              )}
            </FieldShell>
          ))}
        </div>
      ))}
    </div>
  );
};

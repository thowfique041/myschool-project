"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, ImageIcon, Search, Trash2, Upload } from "lucide-react";
import { addMedia, deleteMedia, listMedia, MAX_DEMO_FILE, updateMedia, useDemo, type MediaItem } from "./demo-store";
import { AdminButton, ConfirmDialog, FormRow, inputCls, Modal, formatBytes, useToast } from "./ui";
import { cn } from "@/lib/utils";

const ACCEPT_IMAGES = "image/jpeg,image/png,image/webp,image/gif";
const ACCEPT_ALL = `${ACCEPT_IMAGES},application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
const MAX = MAX_DEMO_FILE;

/** Demo upload: reads the file into the browser (with progress) and stores it locally. */
function uploadWithProgress(file: File, alt: string, category: string, onProgress: (pct: number) => void) {
  return new Promise<{ url: string; alt: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    reader.onerror = () => reject(new Error("The file could not be read."));
    reader.onload = () => {
      const res = addMedia({
        url: String(reader.result),
        kind: file.type.startsWith("image/") ? "image" : "document",
        mimeType: file.type,
        size: file.size,
        originalName: file.name.slice(0, 200),
        alt,
        category: category.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-") || "general",
      });
      if (res.ok && res.data) resolve({ url: res.data.url, alt: res.data.alt });
      else reject(new Error(res.ok ? "Upload failed." : res.error));
    };
    reader.readAsDataURL(file);
  });
}

export function UploadBox({ kind, onUploaded, defaultCategory = "general" }: { kind?: "image" | "document"; onUploaded: (item: { url: string; alt: string }) => void; defaultCategory?: string }) {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isImage = file ? file.type.startsWith("image/") : kind !== "document";
  const preview = file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  function choose(f: File | undefined) {
    setError("");
    if (!f) return;
    if (f.size > MAX) return setError("In this browser demo, files must be 1.5 MB or smaller.");
    const accepted = (kind === "image" ? ACCEPT_IMAGES : kind === "document" ? ACCEPT_ALL.replace(ACCEPT_IMAGES + ",", "") : ACCEPT_ALL).split(",");
    if (!accepted.includes(f.type)) return setError("This file type is not allowed here.");
    setFile(f);
    if (!alt) setAlt(f.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " "));
  }

  async function upload() {
    if (!file) return;
    if (isImage && !alt.trim()) return setError("Describe the image for screen-reader users (alternative text).");
    setError("");
    setProgress(0);
    try {
      const res = await uploadWithProgress(file, alt.trim(), category, setProgress);
      toast("success", "File uploaded.");
      setFile(null);
      setAlt("");
      if (inputRef.current) inputRef.current.value = "";
      onUploaded({ url: res.url, alt: res.alt });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setProgress(null);
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-navy-200 bg-paper p-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          choose(e.dataTransfer.files[0]);
        }}
        className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="size-16 rounded-lg object-cover" />
        ) : (
          <span className="flex size-12 items-center justify-center rounded-lg bg-white text-navy-400">
            <Upload aria-hidden className="size-5" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-navy-900">{file ? file.name : "Drop a file here or choose one"}</p>
          <p className="text-xs text-muted">{file ? formatBytes(file.size) : kind === "image" ? "JPG, PNG, WebP or GIF · up to 1.5 MB" : "Images, PDF, DOCX or XLSX · up to 1.5 MB"}</p>
        </div>
        <label className={cn("cursor-pointer", "inline-flex min-h-9 items-center rounded-lg border border-line bg-white px-3 text-sm font-semibold text-navy-800 hover:border-navy-300")}>
          Choose file
          <input ref={inputRef} type="file" className="sr-only" accept={kind === "image" ? ACCEPT_IMAGES : ACCEPT_ALL} onChange={(e) => choose(e.target.files?.[0])} />
        </label>
      </div>
      {file && (
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_10rem_auto] sm:items-end">
          <FormRow label={isImage ? "Alternative text" : "Description"} htmlFor="upload-alt" required={isImage}>
            <input id="upload-alt" className={inputCls()} value={alt} onChange={(e) => setAlt(e.target.value)} maxLength={300} />
          </FormRow>
          <FormRow label="Folder" htmlFor="upload-cat">
            <input id="upload-cat" className={inputCls()} value={category} onChange={(e) => setCategory(e.target.value)} maxLength={40} />
          </FormRow>
          <AdminButton variant="secondary" onClick={upload} busy={progress !== null}>
            {progress !== null ? `Uploading ${progress}%` : "Upload"}
          </AdminButton>
        </div>
      )}
      {progress !== null && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
          <div className="h-full bg-leaf-600 transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-signal-700">
          {error}
        </p>
      )}
    </div>
  );
}

function useMedia(kind?: "image" | "document") {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  useDemo();
  const data = listMedia({ kind, q, page });
  return { q, setQ, page, setPage, data, error: "", reload: () => undefined };
}

function Thumb({ item, className }: { item: MediaItem; className?: string }) {
  return item.kind === "image" ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.url} alt={item.alt} loading="lazy" className={cn("aspect-[4/3] w-full rounded-lg bg-paper object-cover", className)} />
  ) : (
    <span className={cn("flex aspect-[4/3] w-full flex-col items-center justify-center gap-1 rounded-lg bg-paper text-navy-500", className)}>
      <FileText aria-hidden className="size-8" />
      <span className="text-[0.65rem] font-semibold uppercase">{item.mimeType.split("/").pop()?.slice(0, 6)}</span>
    </span>
  );
}

function Pager({ page, total, pageSize, setPage }: { page: number; total: number; pageSize: number; setPage: (n: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <span className="text-muted">
        Page {page} of {pages} · {total} files
      </span>
      <div className="flex gap-2">
        <AdminButton size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </AdminButton>
        <AdminButton size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage(page + 1)}>
          Next
        </AdminButton>
      </div>
    </div>
  );
}

/** Modal used by image/file fields to choose from the library or upload a new file. */
export function MediaPicker({ open, onClose, kind, onPick }: { open: boolean; onClose: () => void; kind?: "image" | "document"; onPick: (url: string, alt: string) => void }) {
  const m = useMedia(kind);
  return (
    <Modal open={open} onClose={onClose} title={kind === "image" ? "Choose an image" : "Choose a file"} wide>
      <UploadBox
        kind={kind}
        onUploaded={(f) => {
          onPick(f.url, f.alt);
          onClose();
        }}
      />
      <div className="mt-5 flex items-center gap-2">
        <Search aria-hidden className="size-4 text-muted" />
        <input aria-label="Search files" placeholder="Search by name or alt text" className={inputCls()} value={m.q} onChange={(e) => (m.setQ(e.target.value), m.setPage(1))} />
      </div>
      {m.error && <p className="mt-3 text-sm text-signal-700">{m.error}</p>}
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {m.data?.items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                onPick(item.url, item.alt);
                onClose();
              }}
              className="group w-full rounded-lg p-1 text-left ring-leaf-500 hover:ring-2 focus-visible:ring-2"
            >
              <Thumb item={item} />
              <span className="mt-1 block truncate text-xs text-ink">{item.originalName}</span>
            </button>
          </li>
        ))}
      </ul>
      {m.data && m.data.items.length === 0 && <p className="py-8 text-center text-sm text-muted">No files yet. Upload one above.</p>}
      {m.data && <Pager page={m.page} total={m.data.total} pageSize={m.data.pageSize} setPage={m.setPage} />}
    </Modal>
  );
}

/** Full media library page. */
export function MediaLibrary({ canEdit, canDelete }: { canEdit: boolean; canDelete: boolean }) {
  const toast = useToast();
  const [kind, setKind] = useState<"image" | "document" | undefined>();
  const m = useMedia(kind);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<MediaItem | null>(null);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const res = updateMedia(editing.id, { alt, category });
    setBusy(false);
    if (res.ok) {
      toast("success", res.message ?? "Saved.");
      setEditing(null);
      m.reload();
    } else toast("error", res.error);
  }
  async function remove() {
    if (!confirm) return;
    setBusy(true);
    const res = deleteMedia(confirm.id);
    setBusy(false);
    setConfirm(null);
    setEditing(null);
    if (res.ok) {
      toast("success", res.message ?? "Deleted.");
      m.reload();
    } else toast("error", res.error);
  }

  return (
    <div>
      {canEdit && <UploadBox onUploaded={() => m.reload()} />}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input aria-label="Search files" placeholder="Search files" className={cn(inputCls(), "pl-9")} value={m.q} onChange={(e) => (m.setQ(e.target.value), m.setPage(1))} />
        </div>
        {[
          [undefined, "All"],
          ["image", "Images"],
          ["document", "Documents"],
        ].map(([k, label]) => (
          <button
            key={label}
            type="button"
            aria-pressed={kind === k}
            onClick={() => (setKind(k as typeof kind), m.setPage(1))}
            className={cn("min-h-9 rounded-full px-4 text-sm font-semibold", kind === k ? "bg-navy-800 text-white" : "border border-line bg-white text-navy-800")}
          >
            {label}
          </button>
        ))}
      </div>
      {m.error && <p className="mt-3 text-sm text-signal-700">{m.error}</p>}
      <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {m.data?.items.map((item) => (
          <li key={item.id} className="rounded-xl border border-line bg-white p-2">
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => {
                setEditing(item);
                setAlt(item.alt);
                setCategory(item.category);
              }}
            >
              <Thumb item={item} />
              <span className="mt-2 block truncate text-xs font-semibold text-navy-900">{item.originalName}</span>
              <span className="block text-[0.7rem] text-muted">
                {formatBytes(item.size)} · {item.category}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {m.data && m.data.items.length === 0 && (
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-line bg-white py-14 text-center">
          <ImageIcon aria-hidden className="size-8 text-navy-200" />
          <p className="mt-2 font-semibold text-navy-900">No files found</p>
          <p className="text-sm text-muted">Uploaded images and documents appear here.</p>
        </div>
      )}
      {m.data && <Pager page={m.page} total={m.data.total} pageSize={m.data.pageSize} setPage={m.setPage} />}

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="File details">
        {editing && (
          <div className="space-y-4">
            <Thumb item={editing} className="aspect-video object-contain" />
            <div className="flex gap-2">
              <a href={editing.url} download={editing.originalName} className="inline-flex min-h-10 items-center rounded-lg border border-line px-4 text-sm font-semibold text-navy-800 hover:border-navy-300">
                Download
              </a>
            </div>
            <p className="text-xs text-muted">
              {editing.mimeType} · {formatBytes(editing.size)} · uploaded by {editing.uploadedBy || "—"} on {new Date(editing.createdAt).toLocaleString()} · stored in this browser only
            </p>
            <FormRow label="Alternative text" htmlFor="m-alt">
              <input id="m-alt" className={inputCls()} value={alt} onChange={(e) => setAlt(e.target.value)} disabled={!canEdit} />
            </FormRow>
            <FormRow label="Folder" htmlFor="m-cat">
              <input id="m-cat" className={inputCls()} value={category} onChange={(e) => setCategory(e.target.value)} disabled={!canEdit} />
            </FormRow>
            <div className="flex justify-between gap-2">
              {canDelete ? (
                <AdminButton variant="ghost" className="text-signal-700" onClick={() => setConfirm(editing)}>
                  <Trash2 aria-hidden className="size-4" /> Delete
                </AdminButton>
              ) : (
                <span />
              )}
              {canEdit && (
                <AdminButton onClick={save} busy={busy}>
                  Save details
                </AdminButton>
              )}
            </div>
          </div>
        )}
      </Modal>
      <ConfirmDialog
        open={Boolean(confirm)}
        title="Delete this file?"
        message={<>“{confirm?.originalName}” will be removed permanently. Any page that still uses it will show a broken image or link.</>}
        busy={busy}
        onConfirm={remove}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}

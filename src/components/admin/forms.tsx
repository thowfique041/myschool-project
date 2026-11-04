"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Trash2 } from "lucide-react";
import type { Field } from "@/cms/fields";
import { deleteItem, discardDraft, saveItem, saveSetting } from "./demo-store";
import { FieldInput, fromFormValues, toFormValues, type OptionsMap } from "./FieldInput";
import { AdminButton, ConfirmDialog, adminBtn, useToast } from "./ui";

type Values = Record<string, unknown>;

function useDirtyGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);
}

function focusFirstError(errors: Record<string, string>) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  requestAnimationFrame(() => document.getElementById(`f-${first.replace(/\./g, "-")}`)?.focus());
}

function FieldGrid({ fields, values, setValue, errors, options, disabled }: { fields: Field[]; values: Values; setValue: (k: string, v: unknown) => void; errors: Record<string, string>; options: OptionsMap; disabled?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <FieldInput key={f.name} field={f} value={values[f.name]} onChange={(v) => setValue(f.name, v)} error={errors[f.name]} errors={errors} path={f.name} options={options} disabled={disabled} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- Resource form */

export function ResourceForm({
  resource,
  singular,
  id,
  fields,
  initial,
  options,
  canEdit,
  canDelete,
  canPublish,
  publishable,
  viewUrl,
  listHref,
}: {
  resource: string;
  singular: string;
  id: string | null;
  fields: Field[];
  initial: Values;
  options: OptionsMap;
  canEdit: boolean;
  canDelete: boolean;
  canPublish: boolean;
  publishable: boolean;
  viewUrl?: string;
  listHref: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const start = useMemo(() => toFormValues(fields, initial), [fields, initial]);
  const [values, setValues] = useState<Values>(start);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [confirm, setConfirm] = useState(false);
  useDirtyGuard(dirty);

  const setValue = (k: string, v: unknown) => {
    setValues((s) => ({ ...s, [k]: v }));
    setDirty(true);
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function submit(statusOverride?: string, stay?: boolean) {
    setBusy(true);
    const payload = fromFormValues(fields, { ...values, ...(statusOverride ? { status: statusOverride } : {}) });
    const res = saveItem(resource, id, payload);
    setBusy(false);
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {});
      toast("error", res.error);
      focusFirstError(res.fieldErrors ?? {});
      return;
    }
    setDirty(false);
    setErrors({});
    toast("success", res.message ?? "Saved.");
    if (statusOverride) setValues((s) => ({ ...s, status: statusOverride }));
    if (!id && res.data?.id) router.replace(stay ? `${listHref}/${res.data.id}` : listHref);
    else if (!stay) router.push(listHref);
  }

  async function remove() {
    if (!id) return;
    setBusy(true);
    const res = deleteItem(resource, id);
    setBusy(false);
    setConfirm(false);
    if (!res.ok) return toast("error", res.error);
    setDirty(false);
    toast("success", res.message ?? "Deleted.");
    router.push(listHref);
  }

  const status = String(values.status ?? "");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit(undefined, true);
      }}
      className="space-y-6"
    >
      {!canEdit && <p className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-muted">Your role can view this {singular.toLowerCase()} but not change it.</p>}
      {publishable && !canPublish && canEdit && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">Your role can save drafts. An Admin must publish them.</p>
      )}
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
        <FieldGrid fields={fields} values={values} setValue={setValue} errors={errors} options={options} disabled={!canEdit} />
      </div>
      <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <div className="flex items-center gap-2">
          {id && canDelete && (
            <AdminButton variant="ghost" className="text-danger" onClick={() => setConfirm(true)} disabled={busy}>
              <Trash2 aria-hidden className="size-4" /> Delete
            </AdminButton>
          )}
          {viewUrl && (
            <a href={viewUrl} target="_blank" rel="noopener" className={adminBtn("ghost")}>
              <ExternalLink aria-hidden className="size-4" /> Open public page
            </a>
          )}
          {dirty && <span className="text-xs text-muted">Unsaved changes</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={listHref} className={adminBtn("outline")}>
            Cancel
          </Link>
          {canEdit && publishable && status !== "draft" && (
            <AdminButton variant="outline" onClick={() => submit("draft", true)} busy={busy}>
              Save as draft
            </AdminButton>
          )}
          {canEdit && (
            <AdminButton type="submit" busy={busy}>
              Save
            </AdminButton>
          )}
          {canEdit && publishable && canPublish && status !== "published" && (
            <AdminButton variant="secondary" onClick={() => submit("published")} busy={busy}>
              Publish now
            </AdminButton>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={confirm}
        title={`Delete this ${singular.toLowerCase()}?`}
        message="This cannot be undone. It will disappear from the website immediately."
        busy={busy}
        onConfirm={remove}
        onClose={() => setConfirm(false)}
      />
    </form>
  );
}

/* ---------------------------------------------------------- Settings form */

export function SettingsForm({
  settingKey,
  fields,
  data,
  draft,
  draftable,
  canEdit,
  canPublish,
  publicPath,
}: {
  settingKey: string;
  fields: Field[];
  data: Values;
  draft: Values | null;
  draftable: boolean;
  canEdit: boolean;
  canPublish: boolean;
  publicPath?: string;
}) {
  const toast = useToast();
  const start = useMemo(() => toFormValues(fields, draft ?? data), [fields, draft, data]);
  const [values, setValues] = useState<Values>(start);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [hasDraft, setHasDraft] = useState(Boolean(draft));
  useDirtyGuard(dirty);

  const setValue = (k: string, v: unknown) => {
    setValues((s) => ({ ...s, [k]: v }));
    setDirty(true);
  };

  async function run(mode: "save" | "draft" | "publish") {
    setBusy(mode);
    const res = saveSetting(settingKey, fromFormValues(fields, values), mode);
    setBusy(null);
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {});
      toast("error", res.error);
      focusFirstError(res.fieldErrors ?? {});
      return false;
    }
    setErrors({});
    setDirty(false);
    setHasDraft(mode === "draft");
    toast("success", res.message ?? "Saved.");
    return true;
  }

  async function discard() {
    setBusy("discard");
    const res = discardDraft(settingKey);
    setBusy(null);
    if (!res.ok) return toast("error", res.error);
    setValues(toFormValues(fields, data));
    setHasDraft(false);
    setDirty(false);
    toast("success", res.message ?? "Draft discarded.");
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        run(draftable ? "draft" : "save");
      }}
      className="space-y-6"
    >
      {hasDraft && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          You are editing an unpublished draft. Publish it to replace the published version.
        </p>
      )}
      {!canEdit && <p className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-muted">Your role can view these settings but not change them.</p>}
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
        <FieldGrid fields={fields} values={values} setValue={setValue} errors={errors} options={{}} disabled={!canEdit} />
      </div>
      <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <div className="flex items-center gap-2">
          {publicPath && (
            <a href={publicPath} target="_blank" rel="noopener" className={adminBtn("ghost")}>
              <ExternalLink aria-hidden className="size-4" /> Open page
            </a>
          )}
          {dirty && <span className="text-xs text-muted">Unsaved changes</span>}
        </div>
        {canEdit && (
          <div className="flex flex-wrap gap-2">
            {draftable ? (
              <>
                {hasDraft && (
                  <AdminButton variant="ghost" onClick={discard} busy={busy === "discard"}>
                    Discard draft
                  </AdminButton>
                )}
                <AdminButton type="submit" variant="outline" busy={busy === "draft"}>
                  Save draft
                </AdminButton>
                {canPublish && (
                  <AdminButton variant="secondary" onClick={() => run("publish")} busy={busy === "publish"}>
                    Publish
                  </AdminButton>
                )}
              </>
            ) : (
              <AdminButton type="submit" busy={busy === "save"}>
                Save changes
              </AdminButton>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

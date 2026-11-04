/**
 * Permission model. Each area has view / edit / delete / publish actions.
 * Super Admin always has every permission. Admin and Editor defaults can be
 * changed by a Super Admin (stored in the roles collection).
 */

export const areas = [
  { key: "dashboard", label: "Dashboard & analytics" },
  { key: "website", label: "Website pages & homepage" },
  { key: "academic", label: "Academic information" },
  { key: "notices", label: "Notices" },
  { key: "admissions", label: "Admissions & applications" },
  { key: "students", label: "Students" },
  { key: "teachers", label: "Teachers & staff" },
  { key: "results", label: "Examinations & results" },
  { key: "news", label: "News & events" },
  { key: "gallery", label: "Gallery" },
  { key: "files", label: "Media & downloads" },
  { key: "messages", label: "Contact messages" },
  { key: "users", label: "Admin accounts & roles" },
  { key: "settings", label: "Site settings" },
  { key: "activity", label: "Activity log" },
] as const;

export type Area = (typeof areas)[number]["key"];
export const actions = ["view", "edit", "delete", "publish"] as const;
export type Action = (typeof actions)[number];
export type Permission = `${Area}.${Action}`;

export const roleKeys = ["super_admin", "admin", "editor"] as const;
export type RoleKey = (typeof roleKeys)[number];

export const roleLabels: Record<RoleKey, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
};

export const allPermissions: Permission[] = areas.flatMap((a) => actions.map((x) => `${a.key}.${x}` as Permission));

const all = (area: Area): Permission[] => actions.map((x) => `${area}.${x}` as Permission);

export const defaultRolePermissions: Record<RoleKey, Permission[]> = {
  super_admin: allPermissions,
  admin: [
    ...all("dashboard"),
    ...all("website"),
    ...all("academic"),
    ...all("notices"),
    ...all("admissions"),
    ...all("students"),
    ...all("teachers"),
    ...all("results"),
    ...all("news"),
    ...all("gallery"),
    ...all("files"),
    ...all("messages"),
    "settings.view",
    "settings.edit",
    "activity.view",
  ],
  editor: [
    "dashboard.view",
    "website.view",
    "website.edit",
    "notices.view",
    "notices.edit",
    "notices.publish",
    "news.view",
    "news.edit",
    "news.publish",
    "gallery.view",
    "gallery.edit",
    "gallery.publish",
    "files.view",
    "files.edit",
  ],
};

export function hasPermission(perms: readonly string[], p: Permission): boolean {
  return perms.includes(p);
}

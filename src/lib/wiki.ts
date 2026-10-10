import { execFileSync } from "node:child_process";
import { join } from "node:path";

export const CATEGORIES = [
  "Teoría",
  "Argentina",
  "Estudios",
  "Recursos",
  "Otro",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUG: Record<Category, string> = {
  Teoría: "teoria",
  Argentina: "argentina",
  Estudios: "estudios",
  Recursos: "recursos",
  Otro: "otro",
};

export const CATEGORY_BLURB: Record<Category, string> = {
  Teoría:
    "Principios universales de la filosofía Bogleheads®: vivir por debajo de tus medios, diversificar, minimizar costos e impuestos y mantener el rumbo.",
  Argentina:
    "Cómo aplicar la filosofía desde Argentina: moneda, inflación, instrumentos disponibles y fiscalidad local. Todo lo publicado acá trata exclusivamente de Argentina y no es trasladable a otros contextos.",
  Estudios: "Evidencia y datos sobre gestión pasiva frente a gestión activa.",
  Recursos:
    "Libros, guías originales y material de referencia para seguir aprendiendo.",
  Otro: "Otros temas que no entran en las categorías anteriores.",
};

export function categorySlug(category: Category): string {
  return CATEGORY_SLUG[category];
}

export function categoryFromSlug(slug: string): Category | undefined {
  return (Object.keys(CATEGORY_SLUG) as Category[]).find(
    (category) => CATEGORY_SLUG[category] === slug,
  );
}

export function categoryUrl(category: Category): string {
  return `/wiki/categoria/${categorySlug(category)}/`;
}

/** File basename without extension, e.g. "teoria/foo.md" -> "foo". */
export function basenameOf(id: string): string {
  const file = id.split("/").pop() ?? id;
  return file.replace(/\.md$/, "");
}

export function articleUrl(category: Category, id: string): string {
  return `/wiki/${categorySlug(category)}/${basenameOf(id)}/`;
}

interface AuthorData {
  author?: string;
  authors?: string[];
}

/** Normalizes the `author` / `authors` front matter into a non-empty list. */
export function getAuthors(data: AuthorData): string[] {
  if (data.authors && data.authors.length > 0) return data.authors;
  if (data.author) return [data.author];
  return [];
}

/**
 * Manual ordering for wiki listings: `order` ascending first (so
 * Introducción can stay on top), then title. Entries without `order`
 * go last.
 */
export function sortWikiEntries<
  T extends { data: { order?: number; title: string } },
>(a: T, b: T): number {
  const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;
  return a.data.title.localeCompare(b.data.title, "es");
}

/**
 * Last-modification date for a wiki entry, resolved at build time as:
 * explicit front matter `updated` → last git commit touching the file →
 * creation `date`.
 *
 * No hooks or manual steps: committing a change is what stamps the new
 * date on the next build. Needs git history at build time only — the
 * deployed static output carries plain dates.
 */
export function resolveUpdated(
  id: string,
  date: Date,
  updated?: Date,
): Date {
  if (updated) return updated;
  try {
    const file = join(process.cwd(), "src/content/wiki", id);
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", file],
      { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (out) {
      const parsed = new Date(out);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
  } catch {
    // No git history (untracked file, shallow clone, no git): fall through.
  }
  return date;
}

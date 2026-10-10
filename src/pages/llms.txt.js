import { getCollection } from "astro:content";

// Automatic llms.txt: full markdown of every wiki article, regenerated on
// every build. Mirrors the blog's per-page llms.txt in a single file.

/** @type {import("astro").APIRoute} */
export const GET = async () => {
  const site = "https://bogleheads.ar";
  const articles = await getCollection("wiki");
  articles.sort((a, b) => a.data.title.localeCompare(b.data.title, "es"));

  const sections = articles
    .map((entry) => {
      const url = `${site}/wiki/${entry.id.replace(/\.md$/, "")}/`;
      return [
        `## ${entry.data.title}`,
        ``,
        `> ${entry.data.description ?? ""}`,
        `> URL: ${url}`,
        ``,
        entry.body,
      ].join("\n");
    })
    .join("\n\n---\n\n");

  const text = [
    `# Bogleheads® Argentina (no oficial)`,
    ``,
    `> Comunidad educativa sobre la filosofía de inversión Bogleheads®`,
    `> (pasiva, indexada y periódica) desde Argentina.`,
    `> URL: ${site}/`,
    ``,
    `---`,
    ``,
    sections,
    ``,
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

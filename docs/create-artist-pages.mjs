/*
 * Creates the Shopify pages that the artist templates need.
 *
 * One-off (but safe to re-run — it skips pages that already exist). Reads the
 * Admin API token from a file OUTSIDE this repo so it can never be committed:
 *
 *   C:\Users\ralf_\.ayasa-shopify-token
 *
 * Pages are created HIDDEN. They render blank until the templates are on the
 * live theme, so publishing is a deliberate separate step at cutover:
 *
 *   node docs/create-artist-pages.mjs --publish
 *
 * Usage:
 *   node docs/create-artist-pages.mjs            # dry run, shows the plan
 *   node docs/create-artist-pages.mjs --create   # create the missing pages
 *   node docs/create-artist-pages.mjs --publish  # flip existing ones visible
 */
import { readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const SHOP = "ayasainstruments.myshopify.com";
const TOKEN_FILE = join(homedir(), ".ayasa-shopify-token");
const TEMPLATES = new URL("../templates/", import.meta.url).pathname.replace(/^\//, "");

const DO_CREATE = process.argv.includes("--create");
const DO_PUBLISH = process.argv.includes("--publish");

let token;
try {
  token = readFileSync(TOKEN_FILE, "utf8").trim();
} catch {
  console.error(`No token file at ${TOKEN_FILE}\nSee the header of this script.`);
  process.exit(1);
}
if (!token) {
  console.error("Token file is empty.");
  process.exit(1);
}

// Newest first; the first version that answers wins. Keeps this working as
// Shopify retires older versions.
const VERSIONS = ["2026-01", "2025-10", "2025-07", "2025-04", "2025-01", "2024-10"];
let endpoint;

async function gql(query, variables) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

async function pickVersion() {
  for (const v of VERSIONS) {
    endpoint = `https://${SHOP}/admin/api/${v}/graphql.json`;
    try {
      const d = await gql("{ shop { name } }");
      if (d?.shop?.name) return { version: v, shop: d.shop.name };
    } catch { /* try the next one */ }
  }
  throw new Error("Could not reach the Admin API with any known version — is the token valid, and does the app have the Online Store pages scope?");
}

// --- what needs to exist, read straight from the theme templates ---
function plan() {
  const out = [];
  for (const file of readdirSync(TEMPLATES)) {
    const m = /^page\.(.+)\.json$/.exec(file);
    if (!m) continue;
    const suffix = m[1];
    let settings;
    try {
      settings = JSON.parse(
        readFileSync(join(TEMPLATES, file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "")
      ).sections?.main?.settings;
    } catch { continue; }
    if (!settings) continue;

    if (settings.artist_name) {
      // Malte's template predates the batch and uses a different suffix; his
      // page already exists, so it is not ours to create.
      if (suffix === "artist-malte") continue;
      out.push({ handle: suffix, title: settings.artist_name, templateSuffix: suffix });
    } else if (suffix === "artists") {
      out.push({ handle: "artists", title: "Artists", templateSuffix: "artists" });
    }
  }
  return out.sort((a, b) => a.handle.localeCompare(b.handle));
}

const { version, shop } = await pickVersion();
console.log(`Connected to ${shop} (Admin API ${version})\n`);

const wanted = plan();
const existing = new Map(
  (await gql("{ pages(first: 250) { nodes { id handle templateSuffix isPublished } } }"))
    .pages.nodes.map(p => [p.handle, p])
);

const missing = wanted.filter(w => !existing.has(w.handle));
const present = wanted.filter(w => existing.has(w.handle));

console.log(`templates needing a page: ${wanted.length}`);
console.log(`already exist:            ${present.length}`);
console.log(`to create:                ${missing.length}\n`);

// flag any page that exists but points at the wrong template
for (const w of present) {
  const p = existing.get(w.handle);
  if (p.templateSuffix !== w.templateSuffix) {
    console.log(`  ! ${w.handle}: template is "${p.templateSuffix}", expected "${w.templateSuffix}"`);
  }
}

if (DO_PUBLISH) {
  const hidden = wanted.map(w => existing.get(w.handle)).filter(p => p && !p.isPublished);
  console.log(`\npublishing ${hidden.length} hidden page(s)...`);
  for (const p of hidden) {
    const d = await gql(
      `mutation($page: PageUpdateInput!, $id: ID!) {
         pageUpdate(id: $id, page: $page) { page { handle isPublished } userErrors { field message } } }`,
      { id: p.id, page: { isPublished: true } }
    );
    const e = d.pageUpdate.userErrors;
    console.log(`  ${e.length ? "FAILED " + JSON.stringify(e) : "published"}  ${p.handle}`);
  }
  process.exit(0);
}

if (!DO_CREATE) {
  console.log("Dry run. Pages that would be created:\n");
  missing.forEach(m => console.log(`  ${m.handle.padEnd(30)} "${m.title}"`));
  console.log("\nRe-run with --create to make them (hidden).");
  process.exit(0);
}

let ok = 0, failed = 0;
for (const m of missing) {
  const d = await gql(
    `mutation($page: PageCreateInput!) {
       pageCreate(page: $page) { page { handle templateSuffix } userErrors { field message } } }`,
    { page: { title: m.title, handle: m.handle, templateSuffix: m.templateSuffix, isPublished: false } }
  );
  const errs = d.pageCreate.userErrors;
  if (errs.length) { failed++; console.log(`  FAILED  ${m.handle}  ${JSON.stringify(errs)}`); }
  else { ok++; console.log(`  created ${d.pageCreate.page.handle}  (template: ${d.pageCreate.page.templateSuffix})`); }
}
console.log(`\ncreated ${ok}, failed ${failed}. All hidden — run with --publish when the theme is live.`);

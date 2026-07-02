import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function walk(dir, ext, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      walk(fullPath, ext, files);
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const tridents = readJson("data/tridents.json");
const categories = readJson("data/categories.json");
const categorySlugs = new Set(categories.map((category) => category.slug));
const tridentSlugs = new Set(tridents.map((trident) => trident.slug));

assert(tridents.length === tridentSlugs.size, "data/tridents.json has duplicate slugs.");
assert(categories.length === categorySlugs.size, "data/categories.json has duplicate slugs.");

for (const trident of tridents) {
  assert(Number.isInteger(trident.id), `Trident ${trident.slug} has a non-integer id.`);
  assert(trident.name, `Trident ${trident.slug} is missing a name.`);
  assert(trident.icon, `Trident ${trident.slug} is missing an icon.`);
  assert(Array.isArray(trident.categories), `Trident ${trident.slug} categories must be an array.`);

  for (const category of trident.categories || []) {
    assert(categorySlugs.has(category), `Trident ${trident.slug} references unknown category ${category}.`);
  }

  const detailPath = path.join(root, "tridents", `${trident.slug}.html`);
  assert(fs.existsSync(detailPath), `Missing detail page for ${trident.slug}.`);
}

for (const category of categories) {
  assert(category.name, `Category ${category.slug} is missing a name.`);
  assert(category.icon, `Category ${category.slug} is missing an icon.`);
  assert(fs.existsSync(path.join(root, "categories", `${category.slug}.html`)), `Missing category page for ${category.slug}.`);
}

const htmlFiles = walk(root, ".html");
const hrefPattern = /href="([^"]+)"/g;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  assert(/<main[\s>]/.test(html), `${relative(file)} is missing a <main> element.`);
  assert(/<h1[\s>]/.test(html), `${relative(file)} is missing an <h1> element.`);

  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|#)/.test(href) || href.startsWith("data:")) continue;

    const cleanHref = href.split("#")[0].split("?")[0];
    const target = path.resolve(path.dirname(file), cleanHref);
    assert(fs.existsSync(target), `${relative(file)} links to missing target ${href}.`);
  }
}

const rootPageCount = 2;
const expectedHtmlCount = tridents.length + categories.length + rootPageCount;
assert(htmlFiles.length === expectedHtmlCount, `Expected ${expectedHtmlCount} HTML files, found ${htmlFiles.length}.`);

if (errors.length > 0) {
  console.error("Site validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site validation passed: ${htmlFiles.length} HTML files, ${tridents.length} tridents, ${categories.length} categories.`);

const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../src");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const failures = [];
if (/_nuxt|__nuxt|_payload|data-v-|@tailwind/.test(html))
  failures.push("Framework output found in HTML");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
if (ids.length !== new Set(ids).size) failures.push("Duplicate HTML IDs");
const assets = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !s.startsWith("#") && !/^(?:https?:|mailto:|tel:)/.test(s));
for (const asset of assets) {
  const file = path.resolve(root, asset.split(/[?#]/)[0]);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file))
    failures.push(`Missing local asset: ${asset}`);
}
for (const name of ["pessoal", "fisioterapia"])
  if (!fs.existsSync(path.join(root, `img/portraits/erika-${name}.webp`)))
    failures.push(`Missing portrait: ${name}`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Static integrity passed: ${assets.length} local references, unique IDs, two portraits, no framework output.`,
  );

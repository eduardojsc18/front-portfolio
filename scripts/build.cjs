const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const target = path.join(root, "dist");
if (target !== path.join(root, "dist"))
  throw new Error("Invalid output directory");
fs.mkdirSync(target, { recursive: true });
fs.cpSync(path.join(root, "src"), target, { recursive: true });
console.log("Static site copied to dist. No framework or bundler required.");

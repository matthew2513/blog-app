import fs from "fs/promises";

async function readJSONFile(path) {
  const data = await fs.readFile(path, "utf-8");
  return JSON.parse(data);
}

async function writeJSONFile(path, data) {
  return fs.writeFile(path, JSON.stringify(data, null, 2));
}

export { readJSONFile, writeJSONFile };

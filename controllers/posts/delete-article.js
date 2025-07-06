import path from "path";
import { fileURLToPath } from "url";
import { readJSONFile, writeJSONFile } from "../../utils/jsonHelper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

async function deletePost(req, res) {
  const id = req.params.id;
  try {
    const articles = await readJSONFile(dataPath);
    const index = articles.findIndex((item) => item.id === id);

    if (index !== -1) {
      articles.splice(index, 1);

      await writeJSONFile(dataPath, articles);
      res.status(200).send("Article deleted successfully");
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

export { deletePost };

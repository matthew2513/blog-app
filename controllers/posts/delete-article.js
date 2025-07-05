import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

async function deletePost(req, res) {
  const id = req.params.id;
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const articles = JSON.parse(data);
    const index = articles.findIndex((item) => item.id === id);

    if (index !== -1) {
      articles.splice(index, 1);

      await fs.writeFile(dataPath, JSON.stringify(articles, null, 2));
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

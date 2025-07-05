import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

async function viewArticle(req, res) {
  const id = req.params.id;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const article = JSON.parse(data).find((item) => item.id === id);

    //view 5 recent articles
    const lastFiveArticles = JSON.parse(data).slice(-5);

    res.render("posts/view-article", { article, lastFiveArticles });
  } catch (error) {
    console.error(error);
  }
}

export { viewArticle };

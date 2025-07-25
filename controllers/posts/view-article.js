import path from "path";
import { fileURLToPath } from "url";
import { readJSONFile } from "../../utils/jsonHelper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

async function viewArticle(req, res) {
  const id = req.params.id;

  try {
    const articles = await readJSONFile(dataPath);
    const article = articles.find((item) => item.id === id);

    //view 5 recent articles
    const recentArticles = articles.slice(-5);

    res.status(200).render("posts/view-article", { article, recentArticles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

export { viewArticle };

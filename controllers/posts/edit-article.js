import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

//edit article page
async function getEditArticle(req, res) {
  const id = req.params.id;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const article = JSON.parse(data).find((item) => item.id === id);

    res.render("posts/edit-article", { article });
  } catch (error) {
    console.error(error);
  }
}

//edit article
async function editArticle(req, res) {
  const id = req.params.id;
  const { title, author, description, content } = req.body;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const articles = JSON.parse(data);
    const index = articles.findIndex((item) => item.id === id);

    if (index !== -1) {
      articles[index] = {
        id,
        title,
        author,
        date: articles[index].date,
        description,
        content,
      };

      await fs.writeFile(dataPath, JSON.stringify(articles, null, 2));
      res.redirect("/posts/blog");
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export { getEditArticle, editArticle };

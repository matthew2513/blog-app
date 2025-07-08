import path from "path";
import { fileURLToPath } from "url";
import { readJSONFile, writeJSONFile } from "../../utils/jsonHelper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

//edit article page
async function getEditArticle(req, res) {
  const id = req.params.id;

  try {
    const articles = await readJSONFile(dataPath);
    const article = articles.find((item) => item.id === id);

    res
      .status(200)
      .render("posts/create-edit-article", { article, isEdit: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

//edit article
async function editArticle(req, res) {
  const id = req.params.id;
  const { title, description, content } = req.body;

  try {
    const articles = await readJSONFile(dataPath);
    const index = articles.findIndex((item) => item.id === id);

    if (index !== -1) {
      articles[index] = {
        id,
        title,
        author: articles[index].author,
        date: articles[index].date,
        description,
        content,
      };

      await writeJSONFile(dataPath, articles);
      res.status(200).redirect("/posts/blog");
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

export { getEditArticle, editArticle };

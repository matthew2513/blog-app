import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

//view all blog posts
async function getBlogPage(req, res) {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const articles = JSON.parse(data);

    res.render("posts/blog", { articles });
  } catch (error) {
    console.error(error);
  }
}

//go to create article page
function getCreateArticle(req, res) {
  res.render("/posts/create-article");
}

//view a single article
function getViewArticle(req, res) {
  res.render("/posts/view-article");
}

export { getBlogPage, getCreateArticle, getViewArticle };

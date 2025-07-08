import path from "path";
import { fileURLToPath } from "url";
import { readJSONFile } from "../../utils/jsonHelper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

//view all blog posts
async function getBlogPage(req, res) {
  try {
    const articles = await readJSONFile(dataPath);

    res.status(200).render("posts/blog", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

export { getBlogPage };

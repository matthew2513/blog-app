import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { readJSONFile, writeJSONFile } from "../../utils/jsonHelper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

//create article page
function getCreateArticle(req, res) {
  res.render("posts/create-article");
}

async function addArticle(req, res) {
  try {
    const { title, author, description, content } = req.body;
    const newArticle = {
      id: uuidv4(),
      title,
      author,
      date: currentDate(),
      description,
      content,
    };

    const articles = await readJSONFile(dataPath);

    articles.push(newArticle);

    await writeJSONFile(dataPath, articles);

    res.status(200).redirect("/posts/blog");
  } catch (error) {
    console.error(error);
  }
}

function currentDate() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  return `${
    monthNames[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;
}

export { getCreateArticle, addArticle };

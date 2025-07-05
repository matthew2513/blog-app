import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../../data/articles.json");

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

    const data = await fs.readFile(dataPath, "utf-8");
    const articles = JSON.parse(data);

    articles.push(newArticle);

    await fs.writeFile(dataPath, JSON.stringify(articles, null, 2));

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

export { addArticle };

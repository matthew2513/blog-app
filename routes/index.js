import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { articles });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/send", (req, res) => {
  console.log(req.body);
  res.redirect("/contact");
});

//creating posts
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/submit", (req, res) => {
  const { title, author, description, summary } = req.body;

  const newArticle = {
    id: articles.length + 1,
    title,
    author,
    description,
    summary,
    date,
  };
  articles.push(newArticle);
  console.log(articles);

  res.redirect("/");
});

//viewing posts
router.get("/article/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = articles.find((a) => a.id === articleId);

  console.log("Requested Article ID:", articleId);
  console.log("Found Article:", article);

  if (article) {
    res.render("article", { article });
  } else {
    res.status(404).send("Article not found.");
  }
});

//updating posts
router.get("/edit/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = articles.find((a) => a.id === articleId);

  console.log("Requested Article ID:", articleId);
  console.log("Found Article:", article);

  if (article) {
    res.render("edit", { article });
  } else {
    res.status(404).send("Article not found.");
  }
});

router.post("/update/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const articleIndex = articles.findIndex((a) => a.id === articleId);

  if (articleIndex !== -1) {
    //update article with new values from the form
    articles[articleIndex] = {
      id: articleId,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      summary: req.body.summary,
      date: articles[articleIndex].date,
    };
    console.log("Requested Article ID:", articleId);
    console.log("Updated Article:", articles[articleIndex]);

    res.redirect("/");
  } else {
    res.status(404).send("Article not found");
  }
});

//deleting posts
router.delete("/delete/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const articleIndex = articles.findIndex((a) => a.id === articleId);

  if (articleIndex !== -1) {
    articles.splice(articleIndex, 1);
    console.log(articles);

    res.status(200).json({ message: "Article deleted" });
  } else {
    res.status(404).json({ message: "Article not found" });
  }
});

export default router;

//for storing posts
const articles = [];

const month = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const d = new Date();
let date = `${month[d.getMonth()]}/${d.getDate()}/${d.getFullYear()}`;

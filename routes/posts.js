import express from "express";
import { getBlogPage, getCreateArticle } from "../controllers/posts/blog.js";
import { viewArticle } from "../controllers/posts/view-article.js";
import { addArticle } from "../controllers/posts/create-article.js";

const router = express.Router();

router.get("/blog", getBlogPage);
router.get("/create-article", getCreateArticle);
router.get("/view-article/:id", viewArticle);

router.post("/submit", addArticle);

export default router;

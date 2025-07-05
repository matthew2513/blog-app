import express from "express";
import {
  getBlogPage,
  getCreateArticle,
  getViewArticle,
} from "../controllers/posts/blog.js";
import { addArticle } from "../controllers/posts/create-article.js";

const router = express.Router();

router.get("/blog", getBlogPage);
router.get("/create-article", getCreateArticle);
router.get("/view-article", getViewArticle);

router.post("/submit", addArticle);

export default router;

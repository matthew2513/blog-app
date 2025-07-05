import express from "express";
import { getBlogPage } from "../controllers/posts/blog.js";
import { viewArticle } from "../controllers/posts/view-article.js";
import {
  getCreateArticle,
  addArticle,
} from "../controllers/posts/create-article.js";
import {
  getEditArticle,
  editArticle,
} from "../controllers/posts/edit-article.js";
import { deletePost } from "../controllers/posts/delete-article.js";

const router = express.Router();

router.get("/blog", getBlogPage);

router.get("/create-article", getCreateArticle);
router.post("/submit", addArticle);

router.get("/view-article/:id", viewArticle);

router.get("/:id/edit", getEditArticle);
router.post("/:id/update", editArticle);

router.delete("/:id/delete", deletePost);

export default router;

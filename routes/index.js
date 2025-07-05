import express from "express";
import {
  getHomePage,
  getAboutPage,
  getContactPage,
  submitContact,
} from "../controllers/index-controller.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);

router.post("/submit-contact", submitContact);

export default router;

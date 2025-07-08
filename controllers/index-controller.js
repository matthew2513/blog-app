import path from "path";
import { fileURLToPath } from "url";
import { readJSONFile, writeJSONFile } from "../utils/jsonHelper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPathArticles = path.join(__dirname, "../data/articles.json");
const dataPathContacts = path.join(__dirname, "../data/contacts.json");

async function getHomePage(req, res) {
  try {
    const articles = await readJSONFile(dataPathArticles);
    const firstTwoArticles = articles.splice(0, 2);

    res.status(200).render("index", { firstTwoArticles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

function getAboutPage(req, res) {
  res.render("about");
}

function getContactPage(req, res) {
  res.render("contact");
}

async function submitContact(req, res) {
  try {
    const { fName, lName, email, subject, message } = req.body;
    const newContact = { fName, lName, email, subject, message };

    const contacts = await readJSONFile(dataPathContacts);

    contacts.push(newContact);

    await writeJSONFile(dataPathContacts, contacts);

    res.status(200).redirect("/contact");
  } catch (error) {
    console.error(error);
  }
}

export { getHomePage, getAboutPage, getContactPage, submitContact };

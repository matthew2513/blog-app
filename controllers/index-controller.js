import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPathArticles = path.join(__dirname, "../data/articles.json");
const dataPathContacts = path.join(__dirname, "../data/contacts.json");

async function getHomePage(req, res) {
  try {
    const data = await fs.readFile(dataPathArticles, "utf-8");
    const firstTwoArticles = JSON.parse(data).splice(0, 2);

    res.render("index", { firstTwoArticles });
  } catch (error) {
    console.error(error);
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

    const data = await fs.readFile(dataPathContacts, "utf-8");
    const contacts = JSON.parse(data);

    contacts.push(newContact);

    await fs.writeFile(dataPathContacts, JSON.stringify(contacts, null, 2));

    res.status(200).redirect("/contact");
  } catch (error) {
    console.error(error);
  }
}

export { getHomePage, getAboutPage, getContactPage, submitContact };

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import indexRoute from "./routes/index.js";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

//automatically serve static files
app.use(express.static(path.join(__dirname, "public")));

// Use the imported routes
app.use("/", indexRoute); // use the `router` here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

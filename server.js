import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import indexRoute from "./routes/index.js";
import postsRoute from "./routes/posts.js";

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);
app.use("/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

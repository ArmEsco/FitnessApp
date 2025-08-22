import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontEnd")));

// routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/views", "login.html"));
});

app.listen(port, () => {
  console.log(`listing on port ${port}`);
});

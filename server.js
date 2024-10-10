import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine("html", (await import("ejs")).renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/viewer"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tarefas = [
  "faturamento pagglo",
];

app.get("/", (req, res) => {
  res.render("index", { tarefaslist: tarefas });
});

app.post("/adicionar", (req, res) => {
  const novaTarefa = req.body;
  const valores = Object.values(req.body)
  console.log(valores)
    
  valores.forEach(valor => {
    tarefas.push(valor)
  });

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Porta 3000 escutando");
});

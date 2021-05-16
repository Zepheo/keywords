import express from "express";
import bodyParser from "body-parser";
import { permutations } from "itertools";
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/getSentences", (req, res) => {
  console.log(req.body);
  const words = req.body.words;
  const wordsAsArray = words.split(",");
  const r = req.body.r === "0" ? wordsAsArray.length : parseInt(req.body.r);
  const perms = [...permutations(wordsAsArray, r)];

  res.json(perms);
});

app.listen(port, () => console.log(`Server is listening to ${port}`));

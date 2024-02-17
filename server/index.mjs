import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();

server.register(fastifyStatic, {
  root: path.join(__dirname, "../client"),
});

server.post("/", async (req) => {
  const inputText = req.body;

  const arrayOfWords = inputText
    .split("\n")
    .filter((item) => item !== "")
    .map((item) => item.split(" ").filter((item) => item !== ""))
    .flat()
    .map((item) => item.toLowerCase());

  const mapOfWords = new Map();
  arrayOfWords.forEach((word) => {
    if (!mapOfWords.has(word)) {
      mapOfWords.set(word, 1);
    } else {
      mapOfWords.set(word, mapOfWords.get(word) + 1);
    }
  });

  const objOfWords = {};
  for (let [key, value] of mapOfWords) {
    objOfWords[key] = value;
  }

  return objOfWords;
});

server.listen({ port: 7777 }).then(() => {
  console.log("server is running");
});

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! This is the first project.");
});

app.listen(3000, () => {
  console.log("Hello from server side, port 3000");
});

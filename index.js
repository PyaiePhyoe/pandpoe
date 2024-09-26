import express from "express";

const app = express();
console.log("Hello from server side.");

app.get("/", (req, res) => {
  res.send("Hello World.");
});

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const dbUri = process.env.DB_URI;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.get("/test", (req, resp) => {
  return resp.status(200).json({ message: "working" });
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(PORT);
    console.log("connected and listening");
  })
  .catch((err) => console.log(err));

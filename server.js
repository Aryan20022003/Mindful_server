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

const authRoutes = require("./routes/auth/auth");
const notesRoutes = require("./routes/notes/notes");
const isSignedIn = require("./middleware/isSignedIn");

app.get("/api/v1/test", (req, resp) => {
  return resp.status(200).json({ message: "working" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", isSignedIn, notesRoutes);

app.use((err, req, resp, next) => {
  console.log(err);
  return resp.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(PORT);
    console.log("connected and listening");
  })
  .catch((err) => console.log(err));

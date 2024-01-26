const express = require("express");
const router = express.Router();
const notesSchemaValidator = require("../../middleware/noteSchemaValidator");
const {
  createNotesWithAI,
  readNotes,
  removeNote,
} = require("../../controller/notes/crud");

router.post("/createAI", notesSchemaValidator, createNotesWithAI);
router.get("/delete", removeNote);
router.get("/records", readNotes);

module.exports = router;

const express = require("express");
const router = express.Router();
const notesSchemaValidator = require("../../middleware/noteSchemaValidator");
const {
  createNotesWithAI,
  readNotes,
  removeNote,
  update
} = require("../../controller/notes/crud");

router.post("/createAI", notesSchemaValidator, createNotesWithAI);
router.get("/delete", removeNote);
router.get("/records", readNotes);
router.post('/updateNote',notesSchemaValidator,update)

module.exports = router;

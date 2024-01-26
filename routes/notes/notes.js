const express = require('express');
const router = express.Router();
const notesSchemaValidator = require('../../middleware/noteSchemaValidator');
const {createNotesWithAI} = require('../../controller/notes/crud');

router.post("/createAI",notesSchemaValidator,createNotesWithAI);

module.exports = router;
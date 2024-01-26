const User = require("../../models/user");
const Note = require("../../models/note");
const aiResponseGenerator = require("../../controller/notes/ai");
const mongoose = require("mongoose");

//req.user={username,email,noOfRequests}

//aiResponse={status:true/false,data:{tone:[string],summary:[string],actionable:[string],disclaimer:string}}

const createNotesWithAI = async (req, res) => {
  try {
    const { thoughts, title } = req.body;
    const { username, email, noOfRequests } = req.user;
    const aiResponse = await aiResponseGenerator(thoughts);
    if (!aiResponse.status) {
      throw new Error(aiResponse.data);
    }
    const { tone, summary, actionable, disclaimer } = aiResponse.data;

    //Session start
    const session = await mongoose.startSession();
    session.startTransaction();

    //create new note with traction
    const note = new Note({
      email,
      emotions: tone,
      title,
      thoughts,
      summary,
      actionable,
      disclaimer,
    });

    const filter = { email };
    const update = { noOfRequests: noOfRequests + 1 };

    const updateUser = await User.updateOne(filter, update).session(session);

    const saveNote = await note.save({ session });

    await session.commitTransaction();
    //Session end
    console.log(saveNote);
    return res
      .status(200)
      .json({ data: { tone, summary, actionable, disclaimer } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const read = (req, res) => {};

const update = (req, res) => {};

const remove = (req, res) => {};

module.exports = {createNotesWithAI,read,update,remove};

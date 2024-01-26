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
    console.log(aiResponse);

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

    // console.log(saveNote);
    await session.commitTransaction();
    //Session end
    console.log(saveNote);
    return res
      .status(200)
      .json({ data: { tone, summary, actionable, disclaimer } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const readNotes = async (req, res) => {
  try {
    const month = parseInt(req?.query?.month) || new Date().getMonth() + 1;
    const year = parseInt(req?.query?.year) || new Date().getFullYear();

    if (month > 12 || month < 1 || year < 1) {
      throw new Error("Invalid month or year");
    }
    // console.log(month, year);
    const email = req.user.email;
    const filter = { email, month, year };

    const data = await Note.find(filter, {
      emotions: 1,
      title: 1,
      thoughts: 1,
      summary: 1,
      actionAble: 1,
      disclaimer: 1,
      _id: 1,
    }).exec();
    // console.log(data);
    return res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = (req, res) => {};

const removeNote = (req, res) => {
  try {
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createNotesWithAI, readNotes, update, removeNote };

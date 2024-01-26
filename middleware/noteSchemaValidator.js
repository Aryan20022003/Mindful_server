const zod = require("zod");

const schema = zod.object({
  thoughts: zod.string().min(1).max(1800),
  title: zod.string().min(1).max(50),
});

const notesSchemaValidator = (req, resp, next) => {
  const { thoughts, title } = req.body;
  const result = schema.safeParse({ thoughts, title });
  if (!result.success) {
    return resp
      .status(400)
      .json({ message: result?.error?.issues[0]?.message });
  }
  // console.log("notesSchemaValidator next")
  next();
};

module.exports = notesSchemaValidator;

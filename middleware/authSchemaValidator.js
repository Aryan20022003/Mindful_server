const { restart } = require("nodemon");
const zod = require("zod");

const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(100),
});

const signUpSchema = zod.object({
  username: zod.string().min(3).max(50),
  email: zod.string().email(),
  password: zod.string().min(8).max(100),
});

const validateSignIn = (req, resp, next) => {
  const { email, password } = req.body;
  const result = signInSchema.safeParse({ email, password });
  if (!result.success) {
    return resp
      .status(400)
      .json({ message: result?.error?.issues[0]?.message });
  }
  next();
};
const validateSignUp = (req, resp, next) => {
  const { username, email, password } = req.body;
  const result = signUpSchema.safeParse({ username, email, password });
  if (!result.success) {
    return resp
      .status(400)
      .json({ message: result?.error?.issues[0]?.message });
  }
  next();
};

module.exports = { validateSignIn, validateSignUp };

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isSignedIn = async (req, resp, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return resp.status(401).json({ message: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { noOfRequests } = await User.findOne(
      { email: data.email },
      { noOfRequests: 1 }
    ).exec();
    req.user = data;
    req.user.noOfRequests = noOfRequests;
    next();
  } catch (err) {
    console.log("error in isSignedIn");
    return resp.status(401).json({ message: err.message });
  }
};

module.exports = isSignedIn;

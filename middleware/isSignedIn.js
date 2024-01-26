const jwt = require("jsonwebtoken");

const isSignedIn = (req, resp, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return resp.status(401).json({ message: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return resp.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isSignedIn;

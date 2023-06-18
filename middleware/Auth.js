const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const secret = process.env.SECRET_KEY;

const verifyUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === null) return res.status(403).json({ message: "Unauthorized request" });

  const splitToken = token.split(" ")[1];
  let verifiedUser = jwt.verify(splitToken, secret);
  if (!verifiedUser) return res.status(403).json({ message: "Access denied" });
  req.user = verifiedUser;
  next();
});

const isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
});

const isUser = catchAsync(async (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
});

const isGuest = catchAsync(async (req, res, next) => {
  if (req.user.role === "guest") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
});

module.exports = { verifyUser, isAdmin, isUser, isGuest };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const catchAsync = require("../utils/catchAsync");
const User = require("../models").user;

// user login
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: "Sorry, your email account doesn't exist." });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Passwords don't match" });

  const token = jwt.sign({ id: user.id, role: user.role, photo: user.photo }, process.env.SECRET_KEY);
  res.status(200).json({ message: "login successfully", token, user });
});

// user register
const register = catchAsync(async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;

  if (full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ message: "Please input a relevant data" });
  } else {
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "User already exists" });

    let photo = "";
    if (req.file) photo = (await uploadToImagekit(req)).url;
    else photo = null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      username,
      phone_number,
      photo: photo,
      role,
    });
    res.status(201).json({ message: "User created successfully", user: newUser });
  }
});

// test users
const getUsers = catchAsync(async (req, res) => {
  const user = await User.findAll();
  res.status(200).json({ user });
});

// Get Profile
const getProfile = catchAsync(async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });
  res.status(200).json({ user });
});

// Update Profile
const updateProfile = catchAsync(async (req, res) => {
  const { id, photo } = req.user;
  const { full_name, email, username, phone_number } = req.body;

  let updateImage = "";
  if (req.file === undefined) {
    updateImage = photo;
  } else if (req.file) {
    if (req.file.size > 3000000) {
      res.status(400).json({ message: "Image should be no more than 3MB" });
    }
    const img = await uploadToImagekit(req);
    updateImage = img.url;
  }

  await User.update({ full_name, email, username, phone_number, photo: updateImage }, { where: { id } });
  res.status(201).json({ message: "Profile updated successfully" });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "Sorry, your email account doesn't exist." });

  res.status(200).json({ user });
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password and confirm password do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.update({ password: hashedPassword }, { where: { email } });
  res.status(201).json({ message: "Password reset successful" });
});

module.exports = {
  login,
  register,
  getUsers,
  updateProfile,
  getProfile,
  getUserByEmail,
  resetPassword,
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const { user } = require("../models");
const catchAsync = require("../utils/catchAsync");

// user login
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const User = await user.findOne({ where: { email } });

  if (!User) return res.status(400).json({ message: "Sorry, your email account doesn't exist." });

  const validPassword = await bcrypt.compare(password, User.password);
  if (!validPassword) return res.status(400).json({ message: "Passwords don't match" });

  const token = jwt.sign({ id: User.id, role: User.role, photo: User.photo }, process.env.SECRET_KEY);
  res.status(200).json({ message: "Login successfully", token, user: User });
});

// user register
const register = catchAsync(async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;

  if (full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ message: "Please input a relevant data" });
  } else {
    const User = await user.findOne({ where: { email } });
    if (User) return res.status(400).json({ message: "User already exists" });

    let photo = "";
    if (req.file) photo = (await uploadToImagekit(req)).url;
    else photo = null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
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
  const User = await user.findAll();
  res.status(200).json({ user: User });
});

// Get Profile
const getProfile = catchAsync(async (req, res) => {
  const User = await user.findOne({ where: { id: req.user.id } });
  res.status(200).json({ user: User });
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

  await user.update({ full_name, email, username, phone_number, photo: updateImage }, { where: { id } });
  res.status(201).json({ message: "Profile updated successfully" });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const User = await user.findOne({ where: { email } });
  if (!User) return res.status(400).json({ message: "sorry, your email account doesn't exist." });

  res.status(200).json({ user: User });
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const { username } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password and confirm password do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await user.update({ password: hashedPassword }, { where: { username } });
  res.status(201).json({ message: "Password reset successfully" });
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

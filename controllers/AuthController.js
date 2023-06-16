const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const { user } = require("../models");

// user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await user.findOne({ where: { email } });

    if (!User) return res.status(400).json({ message: "sorry, your email account doesn't exist." });

    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) return res.status(400).json({ message: "Passwords don't match" });

    const token = jwt.sign({ id: User.id, role: User.role, photo: User.photo }, process.env.SECRET_KEY);
    res.status(200).json({ message: "login successfully", token, User });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// user register
const register = async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;

  if (full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ message: "Please input a relevant data" });
  } else {
    try {
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
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
};

// test users
const getUsers = async (req, res) => {
  try {
    const User = await user.findAll();
    res.status(200).json({ user: User });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const User = await user.findOne({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json({ User });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { id, photo } = req.user;
  const { full_name, email, username, phone_number } = req.body;

  try {
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
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const User = await user.findOne({ where: { email } });
    if (!User) return res.status(400).json({ message: "sorry, your email account doesn't exist." });

    res.status(200).json({ user: User });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { email } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ password: hashedPassword }, { where: { email } });
    res.status(201).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  getUsers,
  updateProfile,
  getProfile,
  getUserByEmail,
  resetPassword,
};

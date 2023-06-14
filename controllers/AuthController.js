const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const User = require("../models").user;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "sorry, your email account doesn't exist." });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).json({ message: "Passwords don't match" });
    const token = jwt.sign({ id: user.id, role: user.role, photo: user.photo }, process.env.SECRET_KEY);

    res.status(200).json({ message: "login successful", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;

  if (full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ message: "Please input a relevant data" });
  } else {
    try {
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
      res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

// test users
const getUsers = async (req, res) => {
  try {
    await User.findAll().then((user) => {
      res.status(200).json({ message: "success", user });
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  console.log(req.user)
  try {
    const profile = await User.findOne(
      {
        where: {
          id: req.user.id
        }
      });
    res.status(200).json({
      profile,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};


// // Update Profile
const updateProfile = async (req, res) => {
  const { id, photo } = req.user;
  const {
    full_name,
    email,
    username,
    phone_number,
  } = req.body;

  let updateImage = "";
  if (req.file === undefined) {
    updateImage = photo;
  } else if (req.file) {
    if (req.file.size > 3000000) {
      response(res, 400, "failed", "Image should be no more than 3MB");
    }
    const img = await uploadToImagekit(req);
    updateImage = img.url;
  }

    const updatedUser = await User.update(
      {
        full_name,
        email,
        username,
        phone_number,
        photo: updateImage,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json({ message: "Profile updated successfully", updatedUser });
};

// // update Password
// const resetPassword = async (req, res) => {
//   const {
//     password, confirmPassword
//   } = req.body;

//   if(password === confirmPassword) {
//     const newPassword = password
//     const updatedPassword = await User.update(
//       {
//         password: newPassword
//       },
//       { where: { id }, returning: true }
//     );
//     res.status(200).json({ message: "Profile berhasil diupdate", updatedPassword });
//   }
// };



module.exports = {
  login,
  register,
  getUsers,
  updateProfile,
  getProfile,
  // resetPassword,
};

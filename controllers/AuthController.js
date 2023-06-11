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
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY);

    res.status(200).json({ message: "login successful", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;
  if (req.file === undefined || full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ message: "Please input a relevant data" });
  } else {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({ message: "User already exists" });

      const photo = await uploadToImagekit(req);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        full_name,
        email,
        password: hashedPassword,
        username,
        phone_number,
        photo: photo.url,
        role,
      });
      res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = {
  login,
  register,
};


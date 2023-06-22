const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const User = require("../models").user;
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

// user login
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  await user
    .findOne({ where: { email } })
    .then(async (user) => {
      if (!user) return res.status(400).json({ msg: "Sorry, your email account doesn't exist." });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ msg: "Passwords don't match" });

      const token = jwt.sign({ id: user.id, role: user.role, photo: user.photo }, process.env.SECRET_KEY);
      res.status(200).json({ msg: "Login successfully", token, user });
    })
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

// user register
const register = catchAsync(async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;

  if (full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ msg: "Please input a relevant data" });
  } else {
    const User = await user.findOne({ where: { email } });
    if (User) return res.status(400).json({ msg: "User already exists" });

    let photo = "";
    if (req.file) photo = (await uploadToImagekit(req)).url;
    else photo = null;

    const hashedPassword = await bcrypt.hash(password, 10);

    await user
      .create({
        full_name,
        email,
        password: hashedPassword,
        username,
        phone_number,
        photo: photo,
        role,
      })
      .then((user) => res.status(201).json({ msg: "User created successfully", user }))
      .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
  }
});

// test users
const getUsers = catchAsync(async (req, res) => {
  await user
    .findAll()
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

// Get Profile
const getProfile = catchAsync(async (req, res) => {
  await user
    .findOne({ where: { id: req.user.id } })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
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
      res.status(400).json({ msg: "Image should be no more than 3MB" });
    }
    const img = await uploadToImagekit(req);
    updateImage = img.url;
  }

  await user
    .update({ full_name, email, username, phone_number, photo: updateImage }, { where: { id } })
    .then((user) => res.status(201).json({ msg: "Profile updated successfully", user }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  await user
    .findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "Sorry, your email account doesn't exist." });
      res.status(200).json({ user });
    })
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const { username } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password and confirm password do not match" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await user
    .update({ password: hashedPassword }, { where: { username } })
    .then(() => res.status(201).json({ msg: "Password reset successfully" }))
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

let otpCache = {};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Simpan OTP ke cache
    otpCache[email] = otp;

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Konfigurasi email
    const mailOptions = {
      from: 'Flytix',
      to: email,
      subject: 'Verification Code',
      text: `Your OTP: ${otp}`,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Ambil OTP dari cache berdasarkan email
    const cachedOTP = otpCache[email];

    if (!cachedOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (otp === cachedOTP) {
      // OTP valid
      delete otpCache[email]; // Hapus OTP dari cache setelah diverifikasi
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      // OTP tidak valid
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
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
  forgotPassword,
  verifyOTP,
};

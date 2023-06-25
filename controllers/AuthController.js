const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const { user } = require("../models");
const catchAsync = require("../utils/catchAsync");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

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
  const { id } = req.user;
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
    .then(() => res.status(201).json({ msg: "Profile updated successfully" }))
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

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  await user
    .findOne({ where: { email } })
    .then(async (user) => {
      if (!user) return res.status(400).json({ msg: "Sorry, your email account doesn't exist." });
      const otp = otpGenerator.generate(6, { digits: true, alphabets: true, upperCaseAlphabets: true, specialChars: false });

      otpCache[email] = otp;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.PASS },
      });

      const mailOptions = {
        from: "Flytix",
        to: email,
        subject: "Verification Code",
        html: `
        <table
          role="presentation"
          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);"
        >
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Verification code</h1>
                            <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                            <h2 style="padding-bottom: 16px">
                              <strong style="font-size: 130%">${otp}</strong>
                            </h2>
                            <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                            <p style="padding-bottom: 16px">
                              Thanks,<br>From flytix</br>
                            </p>
                          </div>
                        </div>
                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                          <p style="padding-bottom: 16px">Made with ♥ in Indonesia</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ msg: "OTP sent to email", user });
    })
    .catch((err) => res.status(err.statusCode || 500).json({ msg: err.message }));
});

const verifyOTP = catchAsync(async (req, res) => {
  const { otp } = req.body;
  const { email } = req.params;

  const cachedOTP = otpCache[email];

  if (!cachedOTP) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  if (otp === cachedOTP) {
    delete otpCache[email];
    res.status(201).json({ msg: "OTP verified successfully" });
  } else {
    return res.status(400).json({ msg: "Invalid OTP" });
  }
});

module.exports = {
  login,
  register,
  getUsers,
  updateProfile,
  getProfile,
  forgotPassword,
  verifyOTP,
  resetPassword,
};

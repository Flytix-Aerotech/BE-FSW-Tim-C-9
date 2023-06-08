const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models").user;
const imagekit = require("./lib/imagekit");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ message: "Email tidak terdaftar" });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ message: "Password salah" });
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        res.status(200).json({ message: "Login berhasil", token, username:user.username, role:user.role, photo:user.photo });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const register = async (req, res) => {
    const {
        first_name,
        last_name,
        username,
        email,
        phone_number,
        password,
        role
    } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        username,
        country_code,
        phone_number,
        address,
        role
    });
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
    res.status(201).json({ message: "User created successfully", token });
};

module.exports = {
    login,
    register,
}
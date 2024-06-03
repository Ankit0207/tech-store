const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/userModel');
const { AdminModel } = require('../model/adminModel');

const registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(200).json({ message: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(200).json({ message: 'password does not match with confirm password' });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(401).json({ error: err.message });
            } else {
                const newUser = new UserModel({ ...req.body, password: hash, confirmPassword: hash });
                await newUser.save();

                return res.status(200).json({ msg: 'user registered', user: newUser })
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, userName: user. }, process.env.JwtSecretKey);
                    return res.status(200).json({ msg: 'login successful', token, user });
                } else {
                    return res.status(200).json({ msg: 'wrong credentials' });
                }
            });
        } else {
            return res.status(200).json({ message: 'user not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ email });

        if (admin) {
            bcrypt.compare(password, admin.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ adminId: admin._id, adminName: admin.adminname }, process.env.JwtSecretKey);
                    return res.status(200).json({ msg: 'login successful', token, admin });
                } else {
                    return res.status(200).json({ msg: 'wrong credentials' });
                }
            });
        } else {
            return res.status(200).json({ message: 'user not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, loginAdmin }
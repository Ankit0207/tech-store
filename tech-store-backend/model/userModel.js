const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true }, lastName: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
}, { versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
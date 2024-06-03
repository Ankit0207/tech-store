const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminname: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
}, { versionKey: false });

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = { AdminModel };
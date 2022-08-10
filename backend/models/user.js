const mongoose = require('mongoose')

const userschema = new mongoose.Schema({

    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, minLength: 3, maxLength: 200, unique: true },
    password: { type: String, required: true, minLength: 3, maxLength: 1042 },
    isAdmin: { type: Boolean, default: false },

}, {
    timestamps: true
})
const User = mongoose.model("User", userschema)
exports.User = User
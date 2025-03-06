const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
    }
}, { timestamps: true })

const User = new mongoose.model("User", userSchema)

module.exports = User
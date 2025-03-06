const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const generateToken = require("../utilities/generateToken");

const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body

        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ name, email, password: hashedPassword, phoneNumber })
        const saved = await newUser.save()
        const token = generateToken(saved._id)
        res.cookie("user-token", token)
        res.status(201).json({ message: "User created", saved })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })

    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json("All fields are required")
        }

        const existUser = await User.findOne({ email })

        if (!existUser) {
            return res.status(400).json("User does not exist")
        }

        const passwordMatch = await bcrypt.compare(password, existUser.password)

        if (!passwordMatch) {
            return res.status(400).json("Password does not match")

        }
        const token = generateToken(existUser._id)
        console.log(token, "token");

        res.cookie("user-token", token)

        res.status(200).json({ message: "Login successfull" })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


module.exports = {
    register,
    login
}
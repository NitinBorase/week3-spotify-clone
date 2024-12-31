const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

router.post("/register", async (req, res) => {
    const { userName, email, password, firstName, lastName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        await newUser.save();

        const token = getToken(newUser);
        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password;

        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(403).json({ err: "Invalid Credential" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({ err: "Invalid Credential" });
    }

    const token = getToken(user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
});

router.get("/get/user", async (req, res) => {
    const currentUser  = req.body;

    if (!currentUser) {
        return res.status(400).json({ message: "Please provide a username or email" });
    }

    try {
        // Find the user by username or email
        const user = await User.findOne({
            token: currentUser ._id 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user data excluding the password
        res.status(200).json(user); // User object will not have password due to the toJSON method in the schema
    } catch (err) {
        console.error("Error retrieving user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
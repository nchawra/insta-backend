const { default: axios } = require("axios");
const express = require("express");
const Token = require("../model/AccessToken");
const User = require("../model/UserModel");
const router = express.Router();

// Save user data in DB
router.post("/save-profile-data", async (req, res) => {
    try {
        const { data } = req.body;

        await User.create({
            userData: data,
        });

        res.status(201).json({
            status: "data saved succcessfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Get all the user profile images
router.post("/me", async (req, res) => {
    try {
        const data = await Token.find();
        const access_token = data[0].access_token;
        const URL = `https://graph.instagram.com/v16.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${access_token}`;
        const response = await axios.get(URL);

        res.status(200).json({
            status: "success",
            data: response.data,
        });
    } catch (error) {
        console.error(error.response);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

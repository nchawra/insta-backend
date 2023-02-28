const mongoose = require("mongoose");

const AccessToken = new mongoose.Schema(
    {
        access_token: { type: String },
    },
    { timestamps: true }
);

const Token = mongoose.model("Token", AccessToken);
module.exports = Token;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userData: [
            {
                id: { type: String },
                caption: { type: String },
                media_type: { type: String },
                media_url: { type: String },
                permalink: { type: String },
                timestamp: { type: String },
            },
        ],
        profilePicture: { type: String },
        profileDescription: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

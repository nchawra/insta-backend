const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const mongoose = require("mongoose");
const Users = require("./routers/UserRouter.");
const Token = require("./model/AccessToken");

app.use(cors());
app.use(express.json());

const PORT = 3001;

mongoose
    .connect("mongodb://127.0.0.1:27017/instagram-demo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("database is connected successfully");
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });

const getLongLiveAccessToken = async (shortLiveToken) => {
    const URL = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=a29137390ab723b7e77f9ae28809b2ac&access_token=${shortLiveToken}`;
    const response = await axios.get(URL);

    await Token.create({
        access_token: response.data.access_token,
    });
};

// save access Token
app.post("/api/save-access-token", async (req, res) => {
    const { code } = req.body;
    const config = {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
    };
    const URL = `https://api.instagram.com/oauth/access_token`;
    const params = {
        client_id: 726988412238261,
        client_secret: "a29137390ab723b7e77f9ae28809b2ac",
        grant_type: "authorization_code",
        redirect_uri: "https://subtle-pie-b18ea2.netlify.app/",
        code: code,
    };

    const response = await axios.post(URL, params, config);
    await getLongLiveAccessToken(response.data.access_token);
    res.status(200).send("success");
});

app.use("/api/users", Users);

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server started at PORT: ${PORT}`);
});

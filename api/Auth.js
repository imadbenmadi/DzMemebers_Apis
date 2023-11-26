const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Users } = require("../models/Db");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../images");
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName =
            file.fieldname +
            "-" +
            uniqueSuffix +
            path.extname(file.originalname);

        // Store only the filename in the database, not the entire path
        req.uploadedFileName = fileName;

        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });
router.post("/Sign_up", upload.single("ProfilePic"), async (req, res) => {
    const { FirstName, LastName, UserName, Email, Password } = req.body;

    if (!FirstName || !LastName || !UserName || !Email || !Password) {
        return res.status(409).json({ message: "Missing Data" });
    }
    const profilePicPath = req.uploadedFileName; 

    const existingUser = await Users.findOne({ UserName: UserName });

    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    } else {
        const newUser = new Users({
            FirstName: FirstName,
            LastName: LastName,
            UserName: UserName,
            Email: Email,
            Password: Password,
            ProfilePic: profilePicPath,
        });

        try {
            await newUser.save();
            res.sendStatus(200);
        } catch (err) {
            res.status(400).json({
                error: "Error creating user",
                details: err.message,
            });
        }
    }
});

router.post("/Login", async (req, res, next) => {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
        return res.status(409).json({ message: "Missing Data" });
    }
    const user = await Users.findOne({ UserName: UserName });
    if (user && user.Password === Password) {
        req.session.userId = user._id;
        res.sendStatus(200);
        console.log(req.session);
    } else {
        res.sendStatus(409);
        console.log("Username or Password isn't correct");
    }
});
router.post("/logout", async (req, res, next) => {
    req.session = null;
    res.sendStatus(200).json({ message: "Logged out successfully" });
});
module.exports.isAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: "Not Authenticated" });
    }
};

module.exports = router;

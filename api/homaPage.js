const express = require("express");
const router = express.Router();
const authMidlleware = require("./authMiddleware");
const { Users } = require("../models/Db");

router.get("/", authMidlleware, async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.session.userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            UserName: user.UserName,
            isMember: user.Membership,
            isAdmin: user.isAdmin,
            UserName: user.UserName,
            ProfilePic: user.ProfilePic,
        });
    } catch (error) {
        next(error);
    }
});
module.exports = router;

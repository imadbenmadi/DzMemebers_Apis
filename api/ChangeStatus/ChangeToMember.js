const express = require("express");
const router = express.Router();
const { Users } = require("../../models/Db");
const authMidlleware = require("../authMiddleware");

router.post("/",authMidlleware, async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.session.userId });
        if (user.Membership == false) {
            user.Membership = true;
            await user.save();
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Error:", error);
        res.sendStatus(500); // Use res.sendStatus(500) to send a 500 status code for an internal server error
    }
});

module.exports = router;

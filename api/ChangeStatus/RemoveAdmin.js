const express = require("express");
const router = express.Router();
const { Users } = require("../../models/Db");
const authMidlleware = require("../authMiddleware");

router.post("/",authMidlleware, async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.session.userId });
        if (user) {
            if (user.isAdmin === true) {
                user.isAdmin = false;
                await user.save();
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error("Error:", error);
        res.sendStatus(500);
    }
});

module.exports = router;

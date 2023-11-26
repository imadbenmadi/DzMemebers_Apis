const express = require("express");
const router = express.Router();
const authMidlleware = require("../authMiddleware");
const { Users } = require("../../models/Db");

router.post("/",authMidlleware, async (req, res, next) => {
    console.log(req.session)
    try {
        const user = await Users.findOne({ _id: req.session.userId });
        if (user) {
            if (user.isAdmin === false) {
                user.isAdmin = true;
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

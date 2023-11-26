const express = require("express");
const router = express.Router();
const passport = require("passport");

const { Users } = require("../models/Db");

router.post("/", async (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).send("Unable to log out");
            } else {
                res.send("Logout successful");
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;

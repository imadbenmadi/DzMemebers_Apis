const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Users, Messages } = require("../models/Db");
const authMidlleware = require("./authMiddleware");

router.get("/",authMidlleware,async (req, res) => {
    try {
        const users = await Users.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});
module.exports = router
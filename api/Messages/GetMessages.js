const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Users, Messages } = require("../../models/Db");
const authMidlleware = require("../authMiddleware");

router.get("/",authMidlleware, async (req, res) => {
    try {
        const messages = await Messages.find({}).populate('Creatore');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

module.exports = router;

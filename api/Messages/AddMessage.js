const express = require("express");
const router = express.Router();
const authMidlleware = require("../authMiddleware");

const {Users, Messages } = require("../../models/Db");
router.post("/",authMidlleware, async (req, res, next) => {
    
    let { title, text } = req.body;
    if (!title || !text) {
        return res.status(409).json({ message: "Missing Data" });
    }
    // Format the day 
   const currentDate = new Date();
   const day = currentDate.getDate();
   const month = currentDate.toLocaleString("default", { month: "long" }); // Use the full month name
   const year = currentDate.getFullYear();
   const formattedDate = `${day} ${month} ${year}`; 
    let newMessage = new Messages({
        Creatore: req.session.userId, //this does not work
        title: title,
        text: text,
        CreatedDate: formattedDate,
    });
    try {
        await newMessage.save();
        res.sendStatus(200);
    } catch {
        res.sendStatus(409);
    }
});
module.exports = router;

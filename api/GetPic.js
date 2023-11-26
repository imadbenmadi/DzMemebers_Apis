const express = require("express");
const path = require("path");
const router = express.Router();

// Define the route to serve profile pictures
router.get("/:filename", (req, res) => {
    const filename = req.params.filename;
    const profilePicsDirectory = path.join(__dirname, "../images"); // Adjust the path as needed

    // Send the image file to the client
    res.sendFile(path.join(profilePicsDirectory, filename));
});

module.exports = router;

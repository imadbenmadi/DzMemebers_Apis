const mongoose = require("mongoose");

const Users = mongoose.model(
    "Users",
    new mongoose.Schema({
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        UserName: { type: String, required: true, unique: true },
        Password: { type: String, required: true },
        Email: { type: String, required: true },
        Membership: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        ProfilePic: { type: String },
    })
);
const Messages = mongoose.model(
    "Messages",
    new mongoose.Schema({
        Creatore: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        title: { type: String, required: true },
        text: { type: String, required: true },
        CreatedDate: { type: String, required: true },
    })
);
module.exports = { Messages, Users };

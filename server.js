const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path")
const env = require("dotenv").config()
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your React app's URL
        credentials: true,
    })
); // Allow cookies to be sent in cross-origin requests));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.set("strictQuery", false);
// const mongoDB = "mongodb://127.0.0.1:27017/Members_Only";
const mongoDB = process.env.MONGO_URL;
async function connect_to_db() {
    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
connect_to_db().catch((err) => console.log(err));

const store = new MongoDBStore({
    uri: mongoDB,
    collection: "sessions",
});

store.on("error", (error) => {
    console.error(error);
});

app.use(
    session({
        secret: "imad",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

// loging the season
// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.body);
//     next();
// });

// Include your authentication routes
app.use("/Auth", require("./api/Auth"));

app.use("/AddMessage", require("./api/Messages/AddMessage"));
app.use("/Logout", require("./api/logout"));
app.use("/homePage", require("./api/homaPage"));
app.use("/changeToAdmin", require("./api/ChangeStatus/ChangeToAdmin"));
app.use("/changeToMember", require("./api/ChangeStatus/ChangeToMember"));
app.use("/RemoveAdmin", require("./api/ChangeStatus/RemoveAdmin"));
app.use("/RemoveMember", require("./api/ChangeStatus/RemoveMember"));
app.use("/GetMessages", require("./api/Messages/GetMessages"));
app.get("/test", (req, res, next) => {
    res.sendStatus(200);
});
app.use("/GetUsers",require("./api/GetUsers"))
app.listen(3000);

module.exports = app;

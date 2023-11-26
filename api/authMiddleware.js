const midlleware = function(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: "Not Authenticated" });
    }
};
module.exports = midlleware;
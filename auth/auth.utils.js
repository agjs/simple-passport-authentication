exports.isLoggedIn = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: "You don't have access to that."
        });
    }

    next();
}
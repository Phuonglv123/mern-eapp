exports.authorizing = (role) => {
    return (req, res, next) => {
        if (req.user.role === role) {
            return next();
        } else {
            res.status(400).json({error: "No permission"})
        }
    }
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        }
        return res.status(403).send({
            status: false,
            message: ` Only ${role}s can perform this action`
        });
    };
};

module.exports = authorizeRole;

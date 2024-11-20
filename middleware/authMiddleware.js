const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ status: false, message: 'Access denied!' });

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser.id);
        if (!user) return res.status(404).send({ status: false, message: "user not found!" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ status: false, message: "Invalid token!" });
    }
}

module.exports = authMiddleware;
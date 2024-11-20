const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ name, password, role }) => {
    if (!['author', 'customer'].includes(role)) {
        return res.status(400).send({ status: false, message: "Invalid role!" });
    }
    if (!name) {
        return res.status(400).send({ status: false, message: "Username is required!" });
    }
    const valuser = await User.findOne({ name });
    if (valuser) return res.status(400).send({ status: false, message: "Username already in use please use different username!" });

    if (!password) {
        return res.status(400).send({ status: false, message: "Password is required!" });
    }

    const user = new User({ name, password, role });
    await user.save();

    return user;
}

exports.loginUser = async ({ name, password }) => {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).send({ status: false, message: "User not found!" });

    if (user.password !== password) {
        return res.status(400).send({ status: false, message: "Invalid password!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '6h',
    })

    return { token: token, user: user };
}

exports.usersService = async ({ page, limit }) => {
    const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);

    return users;
}
const { registerUser, loginUser, usersService } = require('../services/userServices');

exports.register = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        const user = await registerUser({ name, password, role });
        res.status(201).send({ status: true, message: "User registered Successfully!", data: user._id });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ status: false, message: "Username already exist!" });
        }
        res.status(500).send({ status: false, message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await loginUser({ name, password });
        res.status(200).send({ status: true, message: "Logged in successfully!", token: user.token, userId: user.user._id });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.allUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await usersService({ page, limit });
        res.status(200).send({
            status: true,
            totalUsers: users.length,
            currentPage: page,
            totalPages: Math.ceil(users.length / limit),
            data: users,
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

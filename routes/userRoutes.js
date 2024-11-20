const express = require('express');
const { register, login, allUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', allUsers);

module.exports = router;
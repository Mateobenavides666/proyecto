const router = require('express').Router();
const { registro, login } = require('../controller/authController');

router.post('/registro', registro);
router.post('/login', login);

module.exports = router;

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers/LoginController');

/* POST : login a user. */
router.post('/', authController)

module.exports = router;
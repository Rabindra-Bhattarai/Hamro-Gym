const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerStaff);
router.post('/login', authController.login);


module.exports = router; // Ensure you are exporting the router
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', staffController.register);
router.post('/login', staffController.login);
router.post('/logout', verifyToken, staffController.logout);

// New route to get all staff members
router.get('/', verifyToken, staffController.getAllStaff); // Fetch all staff members

// New route to get staff details by phone number
router.get('/:phoneNumber', verifyToken, staffController.getStaffDetailsByPhoneNumber); // Fetch staff details by phone number

// New route to delete staff member by phone number
router.delete('/:phoneNumber', verifyToken, staffController.deleteStaffByPhoneNumber); // Delete staff by phone number

module.exports = router; // Ensure you are exporting the route
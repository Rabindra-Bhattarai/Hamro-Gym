const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { verifyToken } = require('../middleware/auth'); // Ensure you have this middleware for authentication

// Route to add a new member
router.post('/', verifyToken, memberController.addMember); // Add a new member

// Route to view all members
router.get('/', verifyToken, memberController.viewMembers); // View all members

// Route to get a specific member's details by phone number
router.get('/phone/:phoneNumber', verifyToken, memberController.getMemberDetailsByPhoneNumber); // Get member details by phone number

// Route to delete a member by phone number
router.delete('/phone/:phoneNumber', verifyToken, memberController.deleteMember); // Delete member by phone number

module.exports = router; // Ensure you are exporting the router
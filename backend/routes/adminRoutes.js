const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/details', adminController.getAdminDetails); // New route to get admin details
router.delete('/delete', adminController.deleteAdmin); // New route to delete admin

module.exports = router; // Ensure you are exporting the router
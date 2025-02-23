const { Admin } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    const admin = await Admin.findOne({ where: { phoneNumber } });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ phoneNumber: admin.phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Get admin details
exports.getAdminDetails = async (req, res) => {
    const { phoneNumber } = req.userId; // Assuming the phone number is stored in the token
    try {
        const admin = await Admin.findOne({ where: { phoneNumber } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin details', error });
    }
};

// Delete admin (if needed)
exports.deleteAdmin = async (req, res) => {
    const { phoneNumber } = req.userId; // Assuming the phone number is stored in the token
    try {
        const admin = await Admin.findOne({ where: { phoneNumber } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        await admin.destroy();
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
};
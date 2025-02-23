const { Staff } = require('../models');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { fullName, phoneNumber, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const staff = await Staff.create({ fullName, phoneNumber, email, password: hashedPassword });
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error registering staff', error });
    }
};

exports.login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    const staff = await Staff.findOne({ where: { phoneNumber } });

    if (!staff || !bcrypt.compareSync(password, staff.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ phoneNumber: staff.phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

// Get staff details
exports.getAllStaff = async (req, res) => {
    try {
        const staffMembers = await Staff.findAll();
        res.json(staffMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff members', error });
    }
};

// Fetch staff details by phone number
exports.getStaffDetailsByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params; // Get phone number from the request parameters
    try {
        const staff = await Staff.findOne({ where: { phoneNumber } });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff details', error });
    }
};

// Delete staff member by phone number
exports.deleteStaffByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params; // Get phone number from the request parameters
    try {
        const staff = await Staff.findOne({ where: { phoneNumber } });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        await staff.destroy(); // Delete the staff member
        res.json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting staff member', error });
    }
};
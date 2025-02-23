const { Admin, Staff } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register staff
exports.registerStaff = async (req, res) => {
    const { fullName, phoneNumber, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const staff = await Staff.create({ fullName, phoneNumber, email, password: hashedPassword });
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error registering staff', error });
    }
};

// Login for both admin and staff
exports.login = async (req, res) => {
    const { phoneNumber, password } = req.body;

    // Check if the user is admin
    if (phoneNumber === 'admin' && password === 'admin') {
        const token = jwt.sign({ phoneNumber: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, userType: 'admin' });
    }

    // Check if the user is staff
    const staff = await Staff.findOne({ where: { phoneNumber } });
    if (!staff || !bcrypt.compareSync(password, staff.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ phoneNumber: staff.phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userType: 'staff' });
};
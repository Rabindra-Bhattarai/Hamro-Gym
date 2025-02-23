const { Member } = require('../models');

// Add a new member
exports.addMember = async (req, res) => {
    const { fullName, dateOfBirth, gender, phoneNumber, email, address, membershipType, startDate, expireDate } = req.body; // Changed Email to email
    try {
        const member = await Member.create({ fullName, dateOfBirth, gender, phoneNumber, email, address, membershipType, startDate, expireDate });
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member', error });
    }
};

// View all members
exports.viewMembers = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching members', error });
    }
};

// Get a specific member's details by phone number
exports.getMemberDetailsByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params; // Get phone number from the request parameters
    try {
        const member = await Member.findOne({ where: { phoneNumber: phoneNumber } });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member details', error });
    }
};

// Delete a member by phone number
exports.deleteMember = async (req, res) => {
    const { phoneNumber } = req.params; // Get phone number from the request parameters

    try {
        const member = await Member.findOne({ where: { phoneNumber: phoneNumber } });
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        await member.destroy(); // Delete the member
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting member', error });
    }
};
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        fullName: DataTypes.STRING,
        dateOfBirth: DataTypes.DATE,
        gender: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING, // Changed from Email to email
        address: DataTypes.STRING,
        membershipType: DataTypes.STRING,
        startDate: DataTypes.DATE,
        expireDate: DataTypes.DATE,
    });
    return Member;
};
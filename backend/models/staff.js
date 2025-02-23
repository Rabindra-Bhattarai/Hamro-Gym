module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staff', {
        fullName: DataTypes.STRING,
        phoneNumber: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    return Staff;
};
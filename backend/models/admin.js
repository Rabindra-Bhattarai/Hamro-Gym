module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        phoneNumber: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: DataTypes.STRING,
    });
    return Admin;
};
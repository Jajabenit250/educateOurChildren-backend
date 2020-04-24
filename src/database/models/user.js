module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    token: { type: DataTypes.STRING(500), allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'requester' },
  }, {});
  user.associate = () => {
  };
  return user;
};

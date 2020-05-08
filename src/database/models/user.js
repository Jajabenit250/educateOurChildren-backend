module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    token: { type: DataTypes.STRING(500), allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'content_consumer' },
  }, {});
  user.associate = () => {
  };
  return user;
};

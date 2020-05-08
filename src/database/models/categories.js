module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
      name: { type: DataTypes.STRING, allowNull: false },
    }, {});
    category.associate = () => {
    };
    return category;
  };
  
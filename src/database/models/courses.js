module.exports = (sequelize, DataTypes) => {
    const course = sequelize.define('course', {
      category: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
    }, {});
    course.associate = () => {
    };
    return course;
  };
  
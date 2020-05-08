module.exports = (sequelize, DataTypes) => {
    const question = sequelize.define('question', {
      user: { type: DataTypes.INTEGER, allowNull: false },
      category: { type: DataTypes.INTEGER, allowNull: false },
      question: { type: DataTypes.STRING, allowNull: false },
    }, {});
    question.associate = () => {
    };
    return question;
  };
  
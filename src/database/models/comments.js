module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
      user: { type: DataTypes.INTEGER, allowNull: false },
      question: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.STRING, allowNull: false },
    }, {});
    comment.associate = () => {
    };
    return comment;
  };
  
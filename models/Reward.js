module.exports = (sequelize, DataTypes) => sequelize.define('Reward', {
  issuedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

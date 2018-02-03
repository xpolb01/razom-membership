module.exports = (sequelize, DataTypes) => sequelize.define('ActivityType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = (sequelize, DataTypes) => sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

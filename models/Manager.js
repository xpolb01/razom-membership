module.exports = (sequelize, DataTypes) => sequelize.define('Manager', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

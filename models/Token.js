module.exports = (sequelize, DataTypes) => sequelize.define('Token', {
  hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distributable: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  expiresAt: {
    type: DataTypes.DATE
  }
});

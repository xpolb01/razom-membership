module.exports = (sequelize, DataTypes) => sequelize.define('Owner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  joinedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // TODO: Needs to be clarified
  pd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distributable: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  amountOfTokens: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

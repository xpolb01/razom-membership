const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

// describe relationships
(({ Project, ActivityType, Benefit, Manager, Owner, Reward, Token, User }) => {
  User.belongsTo(Manager, { foreignKey: 'managerId' });
  Manager.hasOne(User, { as: 'user', foreignKey: 'managerId' });

  Project.belongsTo(Manager, { as: 'manager', foreignKey: 'managerId' });
  Manager.hasMany(Project, { as: 'projects', foreignKey: 'managerId' });

  User.belongsTo(Owner, { foreignKey: 'ownerId' });
  Owner.hasOne(User, { as: 'user', foreignKey: 'ownerId' });

  Token.belongsTo(Owner, { as: 'owner', foreignKey: 'ownerId' });
  Owner.hasMany(Token, { as: 'tokens', foreignKey: 'ownerId' });

  Token.belongsTo(Reward, { as: 'reward', foreignKey: 'rewardId' });
  Reward.hasMany(Token, { as: 'tokens', foreignKey: 'rewardId' });

  Reward.belongsTo(Owner, { as: 'owner', foreignKey: 'ownerId' });
  Owner.hasMany(Reward, { as: 'rewards', foreignKey: 'ownerId' });
  Reward.belongsTo(Manager, { as: 'manager', foreignKey: 'managerId' });
  Manager.hasMany(Reward, { as: 'rewards', foreignKey: 'managerId' });

  Benefit.belongsTo(Owner, { as: 'owner', foreignKey: 'ownerId' });
  Owner.hasMany(Benefit, { as: 'benefits', foreignKey: 'ownerId' });

  Project.belongsToMany(ActivityType, { as: 'activityTypes', through: 'ProjectActivities', foreignKey: 'projectId' });
  ActivityType.belongsToMany(Project, { as: 'projects', through: 'ProjectActivities', foreignKey: 'activityTypeId' });
  Reward.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
  Project.hasMany(Reward, { as: 'rewards', foreignKey: 'projectId' });
})(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.didConnect = db.sequelize.sync({ force: true });

module.exports = db;

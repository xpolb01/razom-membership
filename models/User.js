const moment = require('moment');

module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [1, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [1, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING, // ENUM('M', 'F'),
    allowNull: true,
    validate: {
      isIn: [['M', 'F']]
    }
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'America/New_York',
  },
  profileImgUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  smallProfileImgUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hasLoggedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  inviteLastSentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  needsReset: {
    type: DataTypes.VIRTUAL,
    get: function () {
      // if user has logged in, no need to reset
      if (this.getDataValue('hasLoggedIn')) return false;

      // if user has not been created a profile in 7 days, needs reset...
      const lastUpdatedPlus7 = moment(this.getDataValue('inviteLastSentAt')).add(7, 'days');
      if (moment().isAfter(lastUpdatedPlus7)) return true;

      // otherwise, user can still find password
      return false;
    }
  },
}, {
  instanceMethods: {
    getFullname: () => [this.firstName, this.lastName].join(' ')
  },
  hooks: {
    beforeCreate: (user, options) => {
      user.email = user.email.toLowerCase();
    },
  }
});

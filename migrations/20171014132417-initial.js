const Promise = require('bluebird');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function(t) {
      return Promise.each([
      ], migration => migration());
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return queryInterface.dropAllTables();
    });
  }
};

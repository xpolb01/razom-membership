module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
  }
};


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Usuarios', 
          'rolesId', 
          {
              type: Sequelize.INTEGER,
              allowNull: false, 
              references: {
                  model: 'Roles',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
          }
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Usuarios', 'rolesId');
  }
};

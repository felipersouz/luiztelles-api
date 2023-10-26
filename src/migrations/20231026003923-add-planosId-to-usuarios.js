'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Usuarios', 
          'planosId', 
          {
              type: Sequelize.INTEGER,
              allowNull: true, 
              references: {
                  model: 'Planos',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
          }
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Usuarios', 'planosId');
  }
};

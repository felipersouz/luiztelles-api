'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Usuarios', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID,
            },
            nome: {
                type: Sequelize.STRING,
            },
            sobrenome: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            senha: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Usuarios')
    },
}

'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Usuarios extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Usuarios.belongsToMany(models.roles, {
                through: models.usuarios_roles,
                as: 'usuario_roles',
                foreignKey: 'usuario_id',
            })
            Usuarios.belongsToMany(models.permissoes, {
                through: models.usuarios_permissoes,
                as: 'usuario_permissoes',
                foreignKey: 'usuario_id',
            })
        }
    }
    Usuarios.init(
        {
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: 'Usuarios',
            defaultScope: {
                attributes: {
                    exclude: ['senha'],
                },
            },
        }
    )
    return Usuarios
}

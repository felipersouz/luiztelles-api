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
            Usuarios.belongsTo(models.Roles, {
                through: models.usuarios_roles,
                foreignKey: 'roleId',
            })
            Usuarios.belongsTo(models.Planos, {
              as: 'plano',
              foreignKey: 'planosId'
          });
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
            planosId: {
              type: DataTypes.INTEGER,
              allowNull: true,
              references: {
                  model: 'Planos', 
                  key: 'id'
              }
          },
          roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'roles', 
                key: 'id'
            }
        }
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

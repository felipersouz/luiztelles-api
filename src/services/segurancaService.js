const database = require('../models')
const sequelize = require('sequelize')

class SegurancaService {
    async CadatrarAcl(dto) {
        console.log(dto)

        const usuario = await database.Usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                },
            ],
            where: {
                id: dto.usuario_id,
            },
        })

        if (!usuario) {
            throw new Error('Usuario nao cadastrado')
        }

        const rolesCadastradas = await database.roles.findAll({
            where: {
                id: {
                    [sequelize.Op.in]: dto.roles,
                },
            },
        })

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [sequelize.Op.in]: dto.permissoes,
                },
            },
        })

        await usuario.removeUsuario_roles(usuario.usuario_roles)
        await usuario.removeUsuario_permissoes(usuario.usuario_permissoes)

        await usuario.addUsuario_roles(rolesCadastradas)
        await usuario.addUsuario_permissoes(permissoesCadastradas)

        const novoUsuario = await database.Usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                },
            ],
        })
        return novoUsuario
    }

    async CadastrarPermissoesRoles(dto) {
        console.log(dto)
        const role = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                },
            ],
        })

        if (!role) {
            throw new Error('Role nao cadastradas')
        }

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [sequelize.Op.in]: dto.permissoes,
                },
            },
        })

        await role.removeRoles_das_permissoes(role.roles_das_permissoes)
        await role.addRoles_das_permissoes(permissoesCadastradas)

        const novaRole = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                },
            ],
            where: {
                id: dto.role_id,
            },
        })
        return novaRole
    }
}

module.exports = SegurancaService

const database = require('../models')
const uuid = require('uuid')

class RoleService {
    async Cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome,
            },
        })

        if (role) {
            throw new Error('Role já cadastrada')
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao,
            })
            return newRole
        } catch (error) {
            throw new Error('Houve uma falha ao cadastrar a nova role')
        }
    }
    async Buscar() {
        const roles = await database.roles.findAll()
        return roles
    }

    async Obter(id) {
        const role = await database.roles.findOne({ where: { id } })
        return role
    }

    async Atualizar(id, dto) {
        const role = await database.roles.findOne({ where: { id } })

        if (!role) {
            throw new Error('Role não encontrada')
        }

        try {
            const updatedRole = await role.update({
                nome: dto.nome,
                descricao: dto.descricao,
            })

            return updatedRole
        } catch (error) {
            throw new Error('Houve uma falha ao atualizar a role')
        }
    }

    async Excluir(id) {
        const role = await database.roles.findOne({ where: { id } })

        if (!role) {
            throw new Error('Role não encontrada')
        }

        try {
            await role.destroy()
            return true
        } catch (error) {
            throw new Error('Houve uma falha ao excluir a role')
        }
    }
}

module.exports = RoleService

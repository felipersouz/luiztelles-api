const database = require('../models')

class PlanoService {
    async Cadastrar(dto) {
        try {
            const novoPlano = await database.Planos.create({
                name: dto.name,
                limit_email: dto.limit_email
            })
            return novoPlano
        } catch (error) {
            throw new Error('Erro ao cadastrar novo plano')
        }
    }

    async ObterPorId(id) {
        const plano = await database.Planos.findByPk(id)
        if (!plano) {
            throw new Error('Plano não encontrado')
        }
        return plano
    }

    async Atualizar(id, dto) {
        const plano = await database.Planos.findByPk(id)
        if (!plano) {
            throw new Error('Plano não encontrado')
        }
        try {
            await plano.update({
                name: dto.nome,
                limit_email: dto.limit_email,
            })
            return plano
        } catch (error) {
            throw new Error('Erro ao atualizar plano')
        }
    }

    async Deletar(id) {
        const plano = await database.Planos.findByPk(id)
        if (!plano) {
            throw new Error('Plano não encontrado')
        }
        try {
            await plano.destroy()
            return true
        } catch (error) {
            throw new Error('Erro ao excluir plano')
        }
    }

    async ObterTodos() {
        try {
            const planos = await database.Planos.findAll()
            console.log("Planos?", planos)
            return planos
        } catch (error) {
            throw new Error('Erro ao obter todos os planos')
        }
    }
}

module.exports = PlanoService
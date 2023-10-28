const PlanoService = require('../services/planoService')

const planoService = new PlanoService()

class PlanoController {
    static async Cadastrar(req, res) {
        //adicionar permissão e validação
        const dto = req.body
        
        try {
            const plano = await planoService.Cadastrar(dto)
            const response = {
              plano,
              message: "plano criado com sucesso!"
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterPorId(req, res) {
        const id = req.params.id

        try {
            const plano = await planoService.ObterPorId(id)
            return res.status(200).json(plano)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterTodos(req, res) {
        try {
            const planos = await planoService.ObterTodos()
            const response = {
              planos,
              message:"Planos retornados com sucesso!"
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Atualizar(req, res) {
        const id = req.params.id
        const dto = req.body

        try {
            const plano = await planoService.Atualizar(id, dto)
            return res.status(200).json(plano)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Deletar(req, res) {
        const id = req.params.id

        try {
            await planoService.Deletar(id)
            return res
                .status(200)
                .json({ message: 'Plano excluído com sucesso' })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PlanoController

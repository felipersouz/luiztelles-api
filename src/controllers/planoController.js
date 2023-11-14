const PlanoService = require('../services/planoService')

const planoService = new PlanoService()

class PlanoController {
    static async Cadastrar(req, res) {
        const dto = req.body
        if(!dto.name || !dto.limit_email){
          return res.status(400).json({message: "Parâmetro name e limit_email são obrigatórios!"})
        }
        try {
            const plano = await planoService.Cadastrar(dto)
            const response = {
              plano,
              message: "plano criado com sucesso!"
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    }

    static async ObterPorId(req, res) {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Id não informado"});

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
        if(!id || dto.name || dto.limit_email) res.status(400).json({message: "Dados incompletos"});

        try {
            const plano = await planoService.Atualizar(id, dto)
            return res.status(200).json(plano)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Deletar(req, res) {
        const id = req.params.id
        if(!id) res.status(400).json({message: "Id não informado"});

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

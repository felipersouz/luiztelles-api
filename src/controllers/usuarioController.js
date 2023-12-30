const UsuarioService = require('../services/usuarioService')

const _usuarioService = new UsuarioService()

class UsuarioController {

  static async Hello(req, res) {
    const response = {
      message: "Hello world"
    }
    return res.status(200).json(response)
}


    static async Cadastrar(req, res) {
        const dto = req.body
        if(!dto.email || !dto.senha){
          return res.status(400).json({message: "Dados incompletos"})
        }
        
        try {
            const usuario = await _usuarioService.Cadastrar(dto)
            const response = {
              usuario,
              message: "Usuário criado com sucesso!"
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterPorId(req, res) {
        const id = req.params.id

        try {
            const usuario = await _usuarioService.ObterPorId(id)
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterTodos(req, res) {
        try {
            const usuarios = await _usuarioService.ObterTodos()
            const response = {
              usuarios,
              message:"Usuarios retornados com sucesso!"
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
            const usuarioAtualizado = await _usuarioService.Atualizar(id, dto)
            return res.status(200).json(usuarioAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Deletar(req, res) {
        const id = req.params.id

        try {
            await _usuarioService.Deletar(id)
            return res
                .status(200)
                .json({ message: 'Usuário excluído com sucesso' })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = UsuarioController

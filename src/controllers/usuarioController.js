const UsuarioService = require('../services/usuarioService')

const _usuarioService = new UsuarioService()

class UsuarioController {
    static async Cadastrar(req, res) {
        const dto = req.body

        try {
            const usuario = await _usuarioService.Cadastrar(dto)
            return res.status(200).json(usuario)
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
            return res.status(200).json(usuarios)
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

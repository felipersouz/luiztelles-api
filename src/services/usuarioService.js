const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async Cadastrar(dto) {
        const usuario = await database.Usuarios.findOne({
            where: {
                email: dto.email,
            },
        })

        if (usuario) {
            throw new Error('Usuário já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)
            const novoUsuario = await database.Usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                sobrenome: dto.sobrenome,
                email: dto.email,
                senha: senhaHash,
            })
            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar novo usuário')
        }
    }

    async ObterPorId(id) {
        const usuario = await database.Usuarios.findByPk(id)
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }
        return usuario
    }

    async Atualizar(id, dto) {
        const usuario = await database.Usuarios.findByPk(id)
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }
        try {
            const senhaHash = await hash(dto.senha, 8)
            await usuario.update({
                nome: dto.nome,
                sobrenome: dto.sobrenome,
                email: dto.email,
                senha: senhaHash,
            })
            return usuario
        } catch (error) {
            throw new Error('Erro ao atualizar usuário')
        }
    }

    async Deletar(id) {
        const usuario = await database.Usuarios.findByPk(id)
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }
        try {
            await usuario.destroy()
            return true
        } catch (error) {
            throw new Error('Erro ao excluir usuário')
        }
    }

    async ObterTodos() {
        try {
            const usuarios = await database.Usuarios.findAll()
            return usuarios
        } catch (error) {
            throw new Error('Erro ao obter todos os usuários')
        }
    }
}

module.exports = UsuarioService

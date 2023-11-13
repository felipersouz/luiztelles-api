const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class AuthService {
    async Login(dto) {
        const jsonSecret = process.env.JWT_SECRET
        const usuario = await database.Usuarios.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email,
            },
        })

        if (!usuario) {
            throw new Error('Usuario não cadastrado')
        }

        const equalSenha = await compare(dto.senha, usuario.senha)
        if (!equalSenha) {
            throw new Error('Usuário ou senha inválida')
        }

        const accessToken = sign(
            {
                id: usuario.id,
                email: usuario.email,
            },
            jsonSecret,
            { expiresIn: '24h' }
        )
        return { accessToken }
    }
}

module.exports = AuthService

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
                rolesId: dto.rolesId,
                planosId: dto.planosId,
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
            await usuario.update({
                nome: dto.nome,
                sobrenome: dto.sobrenome,
                email: dto.email,
                rolesId: dto.rolesId,
                planosId: dto.planosId,
                status: dto.status,
            })
            return usuario
        } catch (error) {
            console.log('Update User error', error)
            throw new Error('Erro ao atualizar usuário', error.message)
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
            const formatedUsers = await formatUsers(usuarios);
            return formatedUsers
        } catch (error) {
            throw new Error('Erro ao obter todos os usuários:', error.message)
        }
    }
}

const formatUsers= async (usersParams)=> {
  const users = JSON.parse(JSON.stringify(usersParams));
  try {
    const formatedUsers = await Promise.all(users.map(async (user)=> {
      if(!user.planosId) return Promise.resolve(user);
      const plano = await database.Planos.findByPk(user.planosId)
      const role = await database.Roles.findByPk(user.rolesId);
      console.log("plan", plano)
      user.plano = plano;
      user.role = role;
      delete user.planosId;
      delete user.rolesId;
      return Promise.resolve(user);
    }));
    return formatedUsers;
  } catch (error) {
    console.log("Format Users error", error);
    throw new Error(error); 
  }
}

module.exports = UsuarioService

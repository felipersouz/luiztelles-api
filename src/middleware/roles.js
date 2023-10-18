const database = require('../models')

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario = await database.Usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'name'],
                },
            ],
            where: {
                id: usuarioId,
            },
        })

        if (!usuario) {
            res.status(401).send('Usuario não cadastrados')
        }

        const rolesCadastradas = usuario.usuario_roles
            .map((role) => role.nome)
            .some((role) => listaRoles.include(role))

        if (!rolesCadastradas) {
            res.status(401).send(
                'Usuario náo possuí acesso para essa requisição'
            )
        }

        return next()
    }
}

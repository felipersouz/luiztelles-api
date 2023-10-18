const SegurancaService = require('../services/segurancaService')
const _segurancaService = new SegurancaService()

class SegurancaController {
    static async CadastrarAcl(req, res) {
        const { roles, permissoes, usuario_id } = req.body
        try {
            const acl = await _segurancaService.CadatrarAcl({
                roles,
                permissoes,
                usuario_id,
            })

            res.status(201).send(acl)
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: error.message })
        }
    }
    static async CadastrarPermissoesRoles(req, res) {
        const { role_id, permissoes } = req.body

        try {
            const permissoesRoles =
                await _segurancaService.CadastrarPermissoesRoles({
                    role_id,
                    permissoes,
                })
            res.status(201).send(permissoesRoles)
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = SegurancaController

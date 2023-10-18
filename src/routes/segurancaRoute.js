const { Router } = require('express')
const SegurancaController = require('../controllers/SegurancaController')

const router = Router()

router
    .post('/seguranca/acl', SegurancaController.CadastrarAcl)
    .post(
        '/seguranca/permissoes-roles',
        SegurancaController.CadastrarPermissoesRoles
    )

module.exports = router

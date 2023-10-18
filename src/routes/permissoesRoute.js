const { Router } = require('express')

const router = Router()
const PermissaoController = require('../controllers/permissaoController')

router
    .post('/permissoes', PermissaoController.Cadastrar)
    .get('/permissoes', PermissaoController.Buscar)
    .get('/permissoes/:id', PermissaoController.Obter)
    .put('/permissoes/:id', PermissaoController.Atualizar)
    .delete('/permissoes/:id', PermissaoController.Excluir)

module.exports = router

const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router()

router
    .post('/roles', RoleController.Cadastrar)
    .get('/roles', RoleController.Buscar)
    .get('/roles/:id', RoleController.Obter)
    .put('/roles/:id', RoleController.Atualizar)
    .delete('/roles/:id', RoleController.Excluir)

module.exports = router

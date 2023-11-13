const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')
const router = Router()

router
    .post('/usuarios/', UsuarioController.Cadastrar)
    .get('/usuarios/', UsuarioController.ObterTodos)
    .get('/usuarios/:id/', UsuarioController.ObterPorId)
    .put('/usuarios/:id/', UsuarioController.Atualizar)
    .delete('/usuarios/:id/', UsuarioController.Deletar)

module.exports = router

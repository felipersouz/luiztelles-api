const { Router } = require('express')
const PlanoController = require('../controllers/planoController')

const router = Router()

router
    .post('/planos/', PlanoController.Cadastrar)
    .get('/planos/', PlanoController.ObterTodos)
    .get('/planos/:id/', PlanoController.ObterPorId)
    .put('/planos/:id/', PlanoController.Atualizar)
    .delete('/planos/:id/', PlanoController.Deletar)

module.exports = router

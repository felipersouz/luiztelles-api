const { Router } = require('express')
const AuthController = require('../controllers/authController')
const UsuarioController = require('../controllers/usuarioController')

const router = Router()

router.post('/auth/login', AuthController.Login)
router.post('/auth/register', UsuarioController.Cadastrar)

module.exports = router

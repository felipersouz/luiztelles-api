const AuthService = require('../services/authService')

const _authService = new AuthService()

class AuthController {
    static async Login(req, res) {
        const data = req.body

        try {
            const login = await _authService.Login(data)
            res.status(200).send(login)
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    }
}

module.exports = AuthController

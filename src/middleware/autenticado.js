const { verify, decode } = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    const jsonSecret = process.env.JWT_SECRET

    if (!token) {
        return res.status(401).send('Acess token nao informado')
    }

    const [, accessToken] = token.split(' ')

    try {
        verify(accessToken, jsonSecret)

        const { id, email } = await decode(accessToken)

        req.usuarioId = id
        req.usuarioEmail = email

        return next()
    } catch (error) {
        res.status(401).send('Usuario nao autorizado')
    }
}

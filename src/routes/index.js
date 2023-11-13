const bodyParser = require('body-parser')
const cors = require('cors')
const autenticado = require('../middleware/autenticado')

const usuarios = require('./usuarioRoute')
const auth = require('./authRoute')
const role = require('./roleRoute')
const planos = require('./planosRoute')

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        cors({
            origin: ['http://localhost:4200'],
        }),
        auth,
        autenticado,
        usuarios,
        role,
        planos,
    )
}

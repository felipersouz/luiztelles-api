const bodyParser = require('body-parser')
const cors = require('cors')

const usuarios = require('./usuarioRoute')
const auth = require('./authRoute')
const role = require('./roleRoute')
const permissoes = require('./permissoesRoute')
const seguranca = require('./segurancaRoute')

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        cors({
            origin: ['http://localhost:4200'],
        }),
        auth,
        usuarios,
        role,
        permissoes,
        seguranca
    )
}

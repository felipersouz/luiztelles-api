// const PermissaoService = require('../services/permissaoService')

// const _permissaoService = new PermissaoService()

// class PermissaoController {
//     static async Cadastrar(req, res) {
//         const data = req.body

//         try {
//             const role = await _permissaoService.Cadastrar(data)
//             res.status(201).send(role)
//         } catch (error) {
//             res.status(401).send({ message: error.message })
//         }
//     }

//     static async Buscar(req, res) {
//         try {
//             const roles = await _permissaoService.Buscar()
//             res.status(200).send(roles)
//         } catch (error) {
//             res.status(500).send({ message: error.message })
//         }
//     }

//     static async Obter(req, res) {
//         const { id } = req.params

//         try {
//             const role = await _permissaoService.Obter(id)
//             if (!role) {
//                 res.status(404).send({ message: 'Role não encontrada' })
//             } else {
//                 res.status(200).send(role)
//             }
//         } catch (error) {
//             res.status(500).send({ message: error.message })
//         }
//     }

//     static async Atualizar(req, res) {
//         const { id } = req.params
//         const data = req.body

//         try {
//             const role = await _permissaoService.Atualizar(id, data)
//             res.status(200).send(role)
//         } catch (error) {
//             res.status(500).send({ message: error.message })
//         }
//     }

//     static async Excluir(req, res) {
//         const { id } = req.params

//         try {
//             await _permissaoService.Excluir(id)
//             res.status(200).send({ message: 'Role excluída com sucesso' })
//         } catch (error) {
//             res.status(500).send({ message: error.message })
//         }
//     }
// }

// module.exports = PermissaoController

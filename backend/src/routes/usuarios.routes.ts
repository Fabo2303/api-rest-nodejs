import { Router } from 'express'
import UserController from '../controllers/usuarios.controller'
import { authenticateJwt, checkUserRole, errorHandler } from '../middleware/jwtAuthMiddleware'



const router = Router()
const userController = new UserController()

router.get('/usuarios', authenticateJwt, checkUserRole(["ADMIN"]), userController.getAllUsers.bind(userController))

router.get('/usuarios/:id', authenticateJwt, checkUserRole(["ADMIN"]), userController.getUserById.bind(userController))

router.post('/usuarios', authenticateJwt, checkUserRole(["ADMIN"]), userController.createUser.bind(userController))

router.patch('/usuarios/:id', authenticateJwt, checkUserRole(["ADMIN"]), userController.updateUser.bind(userController))

router.delete('/usuarios/:id', authenticateJwt, checkUserRole(["ADMIN"]), userController.deleteUser.bind(userController))

router.use(errorHandler)

export default router

import { Router } from "express"
import ProductoController from "../controllers/productos.controller"
import { authenticateJwt, checkUserRole, errorHandler } from "../middleware/jwtAuthMiddleware"

const router = Router()
const productoController = new ProductoController()

router.get("/productos", authenticateJwt, checkUserRole(["ADMIN", "EMPLEADO"]), productoController.getAllProductos.bind(productoController))

router.get("/productos/:id", authenticateJwt, checkUserRole(["ADMIN", "EMPLEADO"]), productoController.getProductoById.bind(productoController))

router.post("/productos", authenticateJwt, checkUserRole(["ADMIN", "EMPLEADO"]), productoController.createProducto.bind(productoController))

router.patch("/productos/:id", authenticateJwt, checkUserRole(["ADMIN", "EMPLEADO"]), productoController.updateProducto.bind(productoController))

router.delete("/productos/:id", authenticateJwt, checkUserRole(["ADMIN", "EMPLEADO"]), productoController.deleteProducto.bind(productoController))

router.use(errorHandler)

export default router
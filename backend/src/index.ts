import express from 'express'
import indexRoutes from './routes/index.routes'
import usuariosRoutes from './routes/usuarios.routes'
import authRoutes from './routes/auth.routes'
import productosRoutes from './routes/productos.routes'

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

app.use(indexRoutes)
app.use(authRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', productosRoutes)

app.use((_req, res, _next) => {
  res.status(404).json({
    message: 'Endpoint Not found'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

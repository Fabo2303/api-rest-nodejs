import { Request, Response } from "express";
import ProductoService from "../services/productos.service";

class ProductoController {
  private productoService: ProductoService

  constructor() {
    this.productoService = new ProductoService()
  }

  async getAllProductos(_req: Request, res: Response) {
    try {
      const productos = await this.productoService.getAllProductos()
      res.status(200).json(productos)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getProductoById(req: Request, res: Response) {
    try {
      const producto = await this.productoService.getProductoById(Number(req.params.id))
      if (producto) {
        res.status(200).json(producto)
      } else {
        res.status(404).json({ message: 'Producto not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async createProducto(req: Request, res: Response) {
    try {
      const producto = await this.productoService.createProducto(req.body.nombre, req.body.precio)
      res.status(201).json(producto)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }


  async updateProducto(req: Request, res: Response) {
    try {
      const producto = await this.productoService.updateProducto(Number(req.params.id), req.body.nombre, req.body.precio)
      if (producto) {
        res.status(200).json(producto)
      } else {
        res.status(404).json({ message: 'Producto not found' })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  async deleteProducto(req: Request, res: Response) {
    try {
      const producto = await this.productoService.deleteProducto(Number(req.params.id))
      if (producto) {
        res.status(200).json(producto)
      } else {
        res.status(404).json({ message: 'Producto not found' })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default ProductoController
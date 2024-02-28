import ProductoModel from "../models/productos.model"

class ProductoService {
  private productoModel: ProductoModel

  constructor() {
    this.productoModel = new ProductoModel()
  }

  async getAllProductos() {
    return await this.productoModel.getAllProductos()
  }

  async getProductoById(id: number) {
    return await this.productoModel.getProductoById(id)
  }

  async createProducto(nombre: string, precio: number) {
    return await this.productoModel.createProducto(nombre, precio)
  }

  async updateProducto(id: number, nombre: string, precio: number) {
    return await this.productoModel.updateProducto(id, nombre, precio)
  }

  async deleteProducto(id: number) {
    return await this.productoModel.deleteProducto(id)
  }
}

export default ProductoService
import { pool } from '../db'
import { Producto } from '../types/types'

class ProductoModel {
  async getAllProductos(): Promise<Producto[]> {
    try {
      const productos = await pool.query('SELECT * FROM productos')
      return productos[0] as Producto[]
    } catch (error) {
      throw new Error('Error getting productos.')
    }
  }

  async getProductoById(id: number): Promise<Producto | undefined> {
    try {
      const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])
      return Array.isArray(producto) && producto.length > 0 ? producto[0] as Producto : undefined
    } catch (error) {
      throw new Error('Error getting producto.')
    }
  }

  async createProducto(nombre: string, precio: number): Promise<Producto | undefined> {
    try {
      const [rows] = await pool.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio])
      if ('insertId' in rows) {
        return this.getProductoById(rows.insertId)
      }
      return undefined
    } catch (error) {
      throw new Error('Error creating producto.')
    }
  }

  async updateProducto(id: number, nombre: string, precio: number): Promise<Producto | undefined> {
    try {
      await pool.query('UPDATE productos SET nombre = IFNULL(?, nombre), precio = IFNULL(?, precio) WHERE id = ?', [nombre, precio, id]);
      return await this.getProductoById(id);
    } catch (error) {
      throw new Error("Error updating producto.");
    }
  }

  async deleteProducto(id: number): Promise<Producto | undefined> {
    try {
      const [producto] = await pool.query('DELETE FROM productos WHERE id = ?', [id])
      if ('affectedRows' in producto && producto.affectedRows === 0) {
        throw new Error('Producto not found')
      }
      return Array.isArray(producto) && producto.length > 0 ? producto[0] as Producto : undefined
    } catch (error) {
      throw new Error('Error deleting producto.')
    }
  }
}

export default ProductoModel
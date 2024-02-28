import { pool } from '../db'
import { Role, User } from '../types/types'

class UserModel {
  async getAllUsers(): Promise<User[]> {
    try {
      const usuarios = await pool.query('SELECT * FROM usuarios')
      return usuarios[0] as User[]
    } catch (error) {
      throw new Error('Error getting usuarios.')
    }
  }

  async getUserByUsernameAndPassword(username: string, password: string): Promise<User | undefined> {
    try {
      const [usuario] = await pool.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password])
      return Array.isArray(usuario) && usuario.length > 0 ? usuario[0] as User : undefined
    } catch (error) {
      throw new Error('Error getting usuario.')
    }
  }

  async getUserById(id: number): Promise<User | undefined> {
    try {
      const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
      return Array.isArray(usuario) && usuario.length > 0 ? usuario[0] as User : undefined
    } catch (error) {
      throw new Error('Error getting usuario.')
    }
  }

  async createUser(username: string, password: string, role: string): Promise<User | undefined> {
    try {
      const [rows] = await pool.query('INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)', [username, password, role as Role])
      if ('insertId' in rows) {
        return this.getUserById(rows.insertId)
      }
      return undefined
    } catch (error) {
      throw new Error('Error creating usuario.')
    }
  }

  async updateUser(id: number, username: string, password: string, role: string): Promise<User | undefined> {
    try {
      await pool.query('UPDATE usuarios SET username = IFNULL(?, username), password = IFNULL(?, password), role = IFNULL(?, role) WHERE id = ?', [username, password, role, id]);
      return await this.getUserById(id);
    } catch (error) {
      throw new Error("Error updating usuario.");
    }
  }

  async deleteUser(id: number): Promise<User | undefined> {
    try {
      const [usuario] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id])
      if ('affectedRows' in usuario && usuario.affectedRows === 0) {
        throw new Error('Usuario not found')
      }
      return Array.isArray(usuario) && usuario.length > 0 ? usuario[0] as User : undefined
    } catch (error) {
      throw new Error('Error deleting usuario.')
    }
  }
}

export default UserModel
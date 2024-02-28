import { Request, Response } from 'express'
import UserService from '../services/usuarios.service'

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async getAllUsers(_req: Request, res: Response) {
    try {
      const usuarios = await this.userService.getAllUsers()
      res.status(200).json(usuarios)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const usuario = await this.userService.getUserById(Number(req.params.id))
      if (usuario) {
        res.status(200).json(usuario)
      } else {
        res.status(404).json({ message: 'Usuario not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const usuario = await this.userService.createUser(req.body.username, req.body.password, req.body.role)
      res.status(201).json(usuario)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      console.log(req)
      const usuario = await this.userService.updateUser(Number(req.params.id), req.body.username, req.body.password, req.body.role)
      if (usuario) {
        res.status(200).json(usuario)
      } else {
        res.status(404).json({ message: 'Usuario not found' })
      }
    } catch (error : any) {
      res.status(500).json({ message: error.message })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const usuario = await this.userService.deleteUser(Number(req.params.id))
      if (usuario) {
        res.status(200).json(usuario)
      } else {
        res.status(404).json({ message: 'Usuario not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default UserController
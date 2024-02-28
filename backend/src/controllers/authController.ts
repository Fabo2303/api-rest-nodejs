import { Request, Response } from "express"
import { signToken } from "../middleware/jwtAuthMiddleware"
import UserService from "../services/usuarios.service"

class AuthController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body
    try {
      const user = await this.userService.getUserByUsernameAndPassword(
        username,
        password
      )
      if (user) {
        const token = signToken({ username: user.username, role: user.role })
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: "Invalid credentials" })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default AuthController
import UserModel from "../models/usuarios.model";

class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async getAllUsers() {
    return await this.userModel.getAllUsers();
  }

  async getUserById(id: number) {
    return await this.userModel.getUserById(id);
  }

  async getUserByUsernameAndPassword(username: string, password: string) {
    return await this.userModel.getUserByUsernameAndPassword(username, password);
  }

  async createUser(username: string, password: string, role: string) {
    return await this.userModel.createUser(username, password, role);
  }

  async updateUser(id: number, username: string, password: string, role: string) {
    return await this.userModel.updateUser(id, username, password, role);
  }

  async deleteUser(id: number) {
    return await this.userModel.deleteUser(id);
  }
}

export default UserService;
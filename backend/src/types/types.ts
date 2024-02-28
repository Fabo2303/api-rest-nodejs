export enum Role {
  ADMIN = 'ADMIN',
  EMPLEADO = 'EMPLEADO'
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
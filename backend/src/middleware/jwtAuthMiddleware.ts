import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { expressjwt } from 'express-jwt'

const secretKet = 'yariseravengado'

export function signToken(payload: any): string {
  return jwt.sign(payload, secretKet, { expiresIn: '1h' })
}

export const authenticateJwt = expressjwt({ secret: secretKet, algorithms: ['HS256'] })

export function checkUserRole(requiredRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user: any = jwt.decode(token as string);
    if (user && requiredRoles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado. Solo los administradores tienen permiso para acceder a este recurso.' });
    }
  };
}


export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'No estas autorizado para acceder a este recurso'
    })
  }
}
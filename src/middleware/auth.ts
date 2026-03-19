import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt";
import { IJwtPayload, UserRole } from "../models/JwtPayload";

export interface AuthRequest extends Request {
  user?: IJwtPayload;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Access token expirado" });
    }

    return res.status(401).json({ message: "Token inválido" });
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
    }

    next();
  };
};

export const authorizeSelfOrAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const usuarioId = req.params.usuarioId;

  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  if (req.user.rol === 'admin' || req.user.id === usuarioId) {
    return next();
  }

  return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
};
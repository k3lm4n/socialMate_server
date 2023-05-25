import { RequestHandler, Request, Response, NextFunction } from "express";
import { JWTServices } from "../utils/JWTServices";

export const ensureAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const [auth, tokens]  = req.headers.authorization?.split(" ") as [string, string];

  if (!auth || auth !== "Bearer")
    return res.status(401).json({ message: "Token não encontrado" });
  
  if (!tokens) 
    return res.status(401).json({ message: "Token não encontrado" });

  const payload = JWTServices.verify(tokens);

  if (payload === "JWT_SECRET_NOT_FOUND") {
    return res.status(500).json({ message: "Erro ao verificar token" });
  }

  if (payload === "INVALID_TOKEN") {
    return res.status(401).json({ message: "Token inválido" });
  }
  console.log(payload);

  return next();
};

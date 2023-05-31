import { RequestHandler, Request, Response, NextFunction } from "express";
import { JWTServices } from "../utils/JWTServices";

export const ensureAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [auth, tokens] = String(req.headers.authorization).split(" ") as [] | [undefined, undefined];
    const { tokens:accessToken } = req.cookies;

    console.log("====================================");
    console.log(accessToken);
    console.log("====================================");

    if (!auth || auth !== "Bearer" && !accessToken)
      return res.status(401).json({ message: "Falha na autenticação" });

    if (!tokens && !accessToken)
      return res.status(401).json({ message: "Token não encontrado" });

    const payload = JWTServices.verify(tokens || accessToken);

    if (payload === "JWT_SECRET_NOT_FOUND") {
      return res.status(500).json({ message: "Erro ao verificar token" });
    }

    if (payload === "INVALID_TOKEN") {
      return res.status(401).json({ message: "Token inválido" });
    }
    console.log(payload);

    return next();
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error || "Erro" });
  }
};

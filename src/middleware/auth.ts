import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();



module.exports = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(400)
			.send({ message: "Acesso Negado" });

	jwt.verify(token, process.env.JWTPRIVATEKEY , (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "Token Invalido" });
		} else {
			req.user = validToken;
			next();
		}
	});
};
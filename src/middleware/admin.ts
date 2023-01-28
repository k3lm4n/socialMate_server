import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


dotenv.config();



module.exports = (req:Request, res:Response, next: NextFunction) => {
	const token = req.header("x-auth-token");
	if (!token) return res.status(400).send("Access denied, no token provided.");

	jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "invalid token" });
		} else {
			if (!validToken.isAdmin)
				return res
					.status(403)
					.send({ message: "You don't have access to this content!" });

			req.user = validToken;
			next();
		}
	});
};

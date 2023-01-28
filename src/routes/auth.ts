import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();
const routes = Router();

routes.post("/", async (req, res) => {
	const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });

	if (!user)
		return res.status(400).send({ message: "Email ou Password Inavildos!" });


	const validPassword = await bcrypt.compare(req.body.password, user.password);

	if (!validPassword)
		return res.status(400).send({ message: "Email ou Password Inavildos!" });

	// const token = user.generateAuthToken();
	res.status(200).send({ data: user, message: "Espere um instante." });
});

export default routes;
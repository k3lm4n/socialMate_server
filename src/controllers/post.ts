import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";




const prisma = new PrismaClient()


class PostContrller{

    async create(req:Request,res:Response){



    }

    async update(req:Request,res:Response){}

    async delete(req:Request,res:Response){}

    async get(req:Request,res:Response){}

    async getAll(req:Request,res:Response){}




}

export default new PostContrller()
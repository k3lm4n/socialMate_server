import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";

const prisma = new PrismaClient();


class likes{

    async create(req: Request, res: Response) {

    }

    async delete(req: Request, res: Response) {

    }

    async getAllLikeds (req: Request, res: Response) {
        
    }

}


export default likes;
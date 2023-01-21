import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";


dotenv.config();



const getJWTToken = (payload: any) => {

    const SECRET_CODE = process.env.JWT_SERCRET

}
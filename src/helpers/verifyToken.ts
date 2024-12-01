import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

//middleware pa verificar tokenn
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "No hay token" });
    }
    
    const token = req.headers.authorization.split(' ').pop() as string;

    if (!token) {
        return res.status(400).send({ error: "Token no encontrado" });
    }

    const tokenData = jwt.verify(token, process.env.KEY_TOKEN!)
  
    if (tokenData) {
        next();
    } else {
        return res.status(401).send({ error: "Token inválido" });
    }
};
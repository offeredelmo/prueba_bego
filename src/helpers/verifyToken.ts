import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface TokenPayload {
    uuid: string;
    email: string;
}


//middleware pa verificar tokenn
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "No hay token" });
    }

    const token = req.headers.authorization.split(' ').pop() as string;

    if (!token) {
        return res.status(400).send({ error: "Token no encontrado" });
    }

    try {
        const tokenData = jwt.verify(token, process.env.KEY_TOKEN!) as TokenPayload;

        console.log("Información del token:");

        req.push(tokenData)
        console.log(tokenData);

        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).send({ error: "Token inválido" });
    }
};

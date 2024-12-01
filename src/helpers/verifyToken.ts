import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface InfoUser {
    user: string;
    email: string;
}
interface TokenPayload {
    data: InfoUser,
    iat: number,
    exp: number
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}


//middleware pa verificar tokenn
export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers.authorization) {
        res.status(400).send({ error: "No hay token" });
        return
    }

    const token = req.headers.authorization.split(' ').pop() as string;

    if (!token) {
        res.status(400).send({ error: "Token no encontrado" });
        return
    }

    try {
        if (!process.env.JWT_KEY) {
            res.status(500).send({ error: "A ocurrido un error inesperado" });
            return
        }
        const tokenData = jwt.verify(token, process.env.JWT_KEY!) as TokenPayload
        req.user = tokenData
        console.log("Información del token:");
        console.log(tokenData);
        console.log(tokenData);
        next();
    } catch (error:any) {
        console.error("Error al verificar el token:", error);
        res.status(401).send({ error: `Error ${error.message}` });
        return
    }
};

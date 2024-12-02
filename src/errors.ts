import { NextFunction, Request, Response } from "express";
export class NotFoudError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class BadRequestError extends Error {
    constructor(message: string = "Datos faltantes o inválidos") {
        super(message);
        this.name = "BadRequestError";
    }
}

export class EnvironmentVariableError extends Error {
    constructor(message: string = "Faltan variables de entorno requeridas") {
        super(message);
        this.name = "EnvironmentVariableError";
    }
}

export class DuplicateKeyError extends Error {
    constructor(message: string = "La clave ya existe en el sistema") {
        super(message);
        this.name = "DuplicateKeyError";
    }
}
export class InvalidPlaceIdError extends Error {
    constructor(message: string = "El parámetro 'place_id' es inválido o falta") {
        super(message);
        this.name = "InvalidPlaceIdError";
    }
}


export const errorHandler = (err: Error, req: Request, res: Response): void => {
    if (err instanceof NotFoudError) {
        res.status(404).json({ error: err.message });
    } else if (err instanceof UnauthorizedError) {
        res.status(401).json({ error: err.message });
    } else if (err instanceof BadRequestError) {
        res.status(400).json({ error: err.message });
    } else if (err instanceof EnvironmentVariableError) {
        res.status(500).json({ error: err.message });
    } else if (err instanceof DuplicateKeyError) {
        res.status(409).json({ error: err.message });
    } else if (err instanceof InvalidPlaceIdError) {
        res.status(400).json({ error: err.message });
    } else {
        console.error("Error inesperado:", err);
        res.status(500).json({ error: "Ha ocurrido un error inesperado" });
    }
};
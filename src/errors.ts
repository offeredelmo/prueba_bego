
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

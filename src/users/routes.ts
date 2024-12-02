import express from "express";
import { UserController } from "./controller/user.controller";

export const userRouters = express.Router();
const userController = new UserController();

userRouters.post('/add', async (req, res, next) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});


userRouters.post('/login', async (req, res, next) => {
    try {
        await userController.logIn(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

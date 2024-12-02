import express, { Request, Response } from 'express';
import { OrderController } from './controller/orders.controller';


export const orderRoutes = express.Router();
const locationController = new OrderController();

orderRoutes.post('/add', async (req, res, next) => {
    try {
        await locationController.createOrder(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

orderRoutes.get('/', async (req, res, next) => {
    try {
        await locationController.listOrders(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});


orderRoutes.delete('/', async (req, res, next) => {
    try {
        await locationController.deleteOrder(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

orderRoutes.patch('/status/', async (req, res, next) => {
    try {
        await locationController.changeStatus(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});
import { LocationController } from "./controllers/location.controller";
import { validateToken } from "../helpers/verifyToken";
import express, { Request, Response } from 'express';


export const locationRoutes = express.Router();
const locationController = new LocationController();

locationRoutes.post('/add', async (req, res, next) => {
    try {
        await locationController.createLocationByPlaceId(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

locationRoutes.get('/',
    validateToken,
    async (req, res, next) => {
    try {
        await locationController.listLocations(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

locationRoutes.patch('/',
    validateToken,
    async (req, res, next) => {
    try {
        await locationController.updateLocation(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});


locationRoutes.delete(
    '/',
    validateToken, // Middleware correcto
    async (req, res, next) => {
        try {
            await locationController.deleteLocationById(req, res);
        } catch (error) {
            next(error); // Pasar errores al middleware de manejo de errores
        }
    }
);


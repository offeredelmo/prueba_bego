import express from "express";
import { LocationController } from "./controllers/location.controller";

export const locationRoutes = express.Router();
const locationController = new LocationController();

locationRoutes.post('/add', async (req, res, next) => {
    try {
        await locationController.createLocationByPlaceId(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

locationRoutes.get('/', async (req, res, next) => {
    try {
        await locationController.listLocations(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});

locationRoutes.patch('/', async (req, res, next) => {
    try {
        await locationController.updateLocation(req, res);
    } catch (error) {
        next(error); // Pasar errores al middleware de manejo de errores
    }
});
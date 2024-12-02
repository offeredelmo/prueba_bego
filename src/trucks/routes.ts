import express from "express";
import { TruckController } from "./controller/truck.controller";

export const truckRouters = express.Router();
const truckController = new TruckController()

truckRouters.post("/add", async (req,res,next) => {
    try {
        await truckController.createTruck(req,res)
    } catch (error) {
        
    }
})

truckRouters.get("/", async (req,res,next) => {
    try {
        await truckController.listTrucks(req,res)
    } catch (error) {
        
    }
})

truckRouters.patch("/", async (req,res,next) => {
    try {
        await truckController.updateTruck(req,res)
    } catch (error) {
        
    }
})

truckRouters.delete("/:id", async (req,res,next) => {
    try {
        await truckController.deleteTruck(req,res)
    } catch (error) {
        
    }
})
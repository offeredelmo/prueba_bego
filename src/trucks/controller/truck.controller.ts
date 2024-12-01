import { Request, Response } from "express";
import { CreateTruckDTO, UpdateTruckDTO } from "../model/truck.dto";
import { validate } from "class-validator";
import { TruckService } from "../services/truck.service";
import { ObjectId } from "mongodb";

export class TruckController {

    truckService = new TruckService()

    async createTruck(req: Request, res: Response) {
        try {
            const createTruckDto = new CreateTruckDTO(
                req.body.user_id,
                req.body.year,
                req.body.color,
                req.body.plates
            )
            await this.validateDTO(createTruckDto, res)
            const newTruck = await this.truckService.createTruck(createTruckDto)
            return res.status(201).json(newTruck)
        } catch (error) {
            res.status(500).json(
                { message: `A ocurrido un error inesperado ${error}` }
            )
        }

    }
    async listTrucks(req: Request, res: Response) {
        try {
            const trucks = await this.truckService.listTrucks()
            console.log(trucks.length)
            if (trucks.length === 0) {
                return res.status(200).json({ message: "no hay trucks registrados aun" })
            }
            return res.status(200).json({ trucks })
        } catch (error) {
            res.status(500).json(
                { message: `A ocurrido un error inesperado ${error}` }
            )
        }

    }
    async updateTruck(req: Request, res: Response) {
        try {
            const updateTruckDto = new UpdateTruckDTO(
                req.body._id,
                req.body.user_id,
                req.body.year,
                req.body.color,
                req.body.plates
            )
            await this.validateDTO(updateTruckDto, res)
            const updateTruck = await this.truckService.updateTruck(updateTruckDto)
            console.log(updateTruck)
            return res.status(200).json({ message: "actualizado" })
        } catch (error) {
            res.status(500).json(
                { message: `A ocurrido un error inesperado ${error}` }
            )
        }
    }
    async deleteTruck(req: Request, res: Response) {
        try {
            const id = req.params.id;
    
            if (!id) {
                return res.status(400).json({ message: "Es necesario ingresar el atributo _id" });
            }
    
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ message: "El _id proporcionado no es válido" });
            }
    
            const result = await this.truckService.deleteTruck(id);
    
            if (result.deletedCount > 0) {
                return res.status(202).send(`El truck con el id: ${id} fue eliminado`);
            } else {
                return res.status(404).send(`El truck con el id: ${id} no existe`);
            }
        } catch (error: any) {
            return res.status(500).json({ message: `Ha ocurrido un error inesperado: ${error.message}` });
        }
    }
    

    async validateDTO(dto: any, res: Response) {
        const validateDto = await validate(dto)
        if (validateDto.length > 0) {
            throw res.status(400).json({ message: 'Validation failed', errors: validateDto })
        }
    }

}
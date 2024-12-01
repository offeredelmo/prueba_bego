import { Client, Language } from "@googlemaps/google-maps-services-js"
import { Request, Response } from "express";
import { CreateLocationDto, DeleteLocationDto, UpdateLocationDto } from "../model/locationDto";
import { ObjectId } from "mongodb";
import { validate } from "class-validator";
import { LocationService } from "../services/location.service";
import { NotFoudError, UnauthorizedError } from "../../errors";



export class LocationController {
    private client: Client;
    locationService = new LocationService()
    constructor() {
        this.client = new Client({});
    }

    async createLocationByPlaceId(req: Request, res: Response) {
        try {
            const placeId = req.body.place_id
            const userId = req.body.user_id

            if (!placeId) {
                return res.status(404).json({ message: "falto un place_id" })
            }

            const dateLocation = await this.getPlaceDetails(placeId, res);

            const createLocationDto = new CreateLocationDto(
                dateLocation?.formatted_address as string,
                placeId,
                dateLocation?.geometry?.location.lat as number,
                dateLocation?.geometry?.location.lng as number,
                new ObjectId(userId)
            )
            console.log(userId)
            console.log(createLocationDto.user_id)


            createLocationDto.user_id = new ObjectId(createLocationDto.user_id)

            await this.validateDTO(createLocationDto, res)

            const result = await this.locationService.createLocationByPlaceId(createLocationDto)
            return res.status(201).json(result)

        } catch (error) {
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }
    }


    async listLocations(req: Request, res: Response) {
        try {
            const result = await this.locationService.listLocations()
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }

    }

    async updateLocation(req: Request, res: Response) {
        try {
            const _id = req.body._id
            if (!_id) {
                return res.status(404).json({ message: "falta el _id" })
            }
            const updateLocationDto = new UpdateLocationDto(
                req.body.address,
                req.body.place_id,
                req.body.latitude,
                req.body.longitude,
                req.body.user_id
            )

            await this.validateDTO(updateLocationDto, res)
            const result = await this.locationService.updateLocation(_id, updateLocationDto)
            return res.status(200).json({ message: "actualizado" })
        } catch (error) {
            if (error instanceof NotFoudError) {
                return res.status(404).send({ error: error.message });
            }
            res.status(500).json(
                { message: `A ocurrido un error inesperado ${error}` }
            )
        }
    }

    async deleteLocationById(req: Request, res: Response) {
        try {
            console.log("aqui esta la info del token ")
            console.log(req.user?.data.user)
            const deleteLocationDto = new DeleteLocationDto(
                req.body._id,
                req.body.user_id,
                new ObjectId(req.user?.data.user) //este _id hace referencia al id que viene del token que es el id del usuario
            )
            await this.validateDTO(deleteLocationDto, res)
            const result = await this.locationService.deleteLocation(deleteLocationDto)
            console.log(result);
            if (result.deletedCount > 0) {
                return res.status(200).send(`Location con el id: ${req.body._id} fue eliminado`);
            }
        } catch (error) {
            if (error instanceof NotFoudError) {
                return res.status(404).send({ error: error.message });
            } else if (error instanceof UnauthorizedError) {
                return res.status(403).send({ error: error.message });
            } else {
                console.error("Error inesperado:", error);
                return res.status(500).send({ error: "Ocurrió un error inesperado" });
            }
        }


    }



    private async getPlaceDetails(placeId: string, res: Response) {
        try {
            const response = await this.client.placeDetails({
                params: {
                    place_id: placeId,
                    key: process.env.GOOGLE_MAPS_API_KEY || "",
                    language: Language.es,
                },
            });
            console.log(response)
            console.log(response.data.result.geometry)
            console.log(response.data.result.address_components)
            return response.data.result; // Retorna los detalles del lugar
        } catch (error: any) {
            res.status(404).json({ message: `Failed to fetch details for placeId ${placeId}` })
        }
    }

    async validateDTO(dto: any, res: Response) {
        const validateDto = await validate(dto)
        if (validateDto.length > 0) {
            throw res.status(400).json({ message: 'Validation failed', errors: validateDto })
        }
    }

}
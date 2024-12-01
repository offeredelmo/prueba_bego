
import { Request, Response } from "express";
import { Client, Language } from "@googlemaps/google-maps-services-js";
import { CreateLocationDto } from "../model/locationDto";
import { ObjectId } from "mongodb";
import { validate } from "class-validator";
import { connectToDatabase } from "../../conectDB";
import { LocationEntity } from "../model/location.entity";

export class LocationService {

    nameCollection = "location"
    private client: Client;
    constructor() {
        this.client = new Client({});
    }

    async createLocationByPlaceId(createLocationDto: CreateLocationDto) {
        try {
            const userCollection = (await connectToDatabase()).collection(this.nameCollection);
            const result = await userCollection.insertOne(createLocationDto);

            if (!result.acknowledged) {
                throw new Error("No se pudo insertar la ubicación en la base de datos");
            }

            return {
                _id: result.insertedId,
                address: createLocationDto.address,
                place_id: createLocationDto.place_id,
                latitude: createLocationDto.latitude,
                longitude: createLocationDto.longitude,
                user_id: createLocationDto.user_id
            };
        } catch (error: any) {
            console.error("Error en el servicio al crear la ubicación:", error);
            throw new Error("Error al guardar la ubicación");
        }
    }



    async listLocations() {
        const userCollection = (await connectToDatabase()).collection(this.nameCollection);
        const result = await userCollection.find({}).toArray();
        return result;
    }

    async deleteLocation() {

    }


}






import { Client, Language } from "@googlemaps/google-maps-services-js";
import { CreateLocationDto, UpdateLocationDto } from "../model/locationDto";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../conectDB";

export class LocationService {

    nameCollection = "location"
    private client: Client;
    constructor() {
        this.client = new Client({});
    }

    async createLocationByPlaceId(createLocationDto: CreateLocationDto) {
        try {
            const locationCollection = (await connectToDatabase()).collection(this.nameCollection);
            const result = await locationCollection.insertOne(createLocationDto);

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

    async updateLocation(_id: string, updateLocationDto: UpdateLocationDto) {
        try {
            const locationCollection = (await connectToDatabase()).collection(this.nameCollection);

            const location = await locationCollection.findOne(
                {_id: new ObjectId(_id)},
            );
            if (!location) {
                throw Error(`no se encontro la location con el id: ${_id}`)
            }

            const update = Object.fromEntries( //elimina los atributos undefined
                Object.entries(updateLocationDto).filter(([_, value]) => value !== undefined)
            );
        
            const result = await locationCollection.updateOne(
                {_id: new ObjectId(_id)},
                {$set: update}
            );

            if (result.matchedCount === 0) {
                throw new Error("No se pudo actualizar el camión");
            }
            return result.matchedCount
        } catch (error) {
            throw new Error("Error al actualizar");
        }
    }


}





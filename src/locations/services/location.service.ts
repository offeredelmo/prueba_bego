
import { CreateLocationDto, DeleteLocationDto, UpdateLocationDto } from "../model/locationDto";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../conectDB";
import { NotFoudError, UnauthorizedError } from "../../errors";

export class LocationService {

    locationCollection = "location"
    userCollection = "users"




    async createLocationByPlaceId(createLocationDto: CreateLocationDto) {
        try {
            const userCollection = (await connectToDatabase()).collection(this.userCollection);
            const user = await userCollection.findOne({ _id: new ObjectId(createLocationDto.user_id) })
            if (!user) {
                throw new NotFoudError(`No se encontro el usuario con el id: ${createLocationDto.user_id}`)
            }

            const locationCollection = (await connectToDatabase()).collection(this.locationCollection);
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
        } catch (error) {
            throw error
        }
    }



    async listLocations(userId: string) {
        try {
            const userCollection = (await connectToDatabase()).collection(this.locationCollection);
            const result = await userCollection.find({ user_id: new ObjectId(userId) }).toArray();
            return result;
        } catch (error) {
            throw error

        }

    }

    async updateLocation(_id: string, userId:string, updateLocationDto: UpdateLocationDto) {
        try {
            const locationCollection = (await connectToDatabase()).collection(this.locationCollection);

            const location = await locationCollection.findOne({_id: new ObjectId(_id)})
            if (!location) {
                throw new NotFoudError(`no se encontro la location con el id: ${_id}`)
            }
            const update = Object.fromEntries( //elimina los atributos undefined
                Object.entries(updateLocationDto).filter(([_, value]) => value !== undefined)
            );
            if (`${userId}` == `${location.user_id }`) {
                const result = await locationCollection.findOneAndUpdate(
                { _id: new ObjectId(_id) },
                { $set: update }
            );
            if (result === null) {
                throw new NotFoudError(`no se encontro la location con el id: ${_id}`)
            }
            return result
            } else {
                throw new UnauthorizedError(`No tienes permiso para eliminar esta ubicación`)
            }
           
            
        } catch (error) {
            throw error

        }
    }

    async deleteLocation(deleteLocationDto: DeleteLocationDto) {
        try {
            const locationCollection = (await connectToDatabase()).collection(this.locationCollection);
            const location = await locationCollection.findOne(
                { _id: new ObjectId(deleteLocationDto._id) },
            );
            if (!location) {
                throw new NotFoudError(`no se encontro la location con el id: ${deleteLocationDto._id}`)
            }
            console.log(deleteLocationDto.user_id_token)
            console.log(location.user_id)
            if (`${deleteLocationDto.user_id_token}` == `${location.user_id}`) {
                console.log(deleteLocationDto._id)
                return await locationCollection.deleteOne({ _id: new ObjectId(deleteLocationDto._id) })
            } else {
                throw new UnauthorizedError(`No tienes permiso para eliminar esta ubicación`)
            }
        } catch (error) {
            throw error
        }
    }

}




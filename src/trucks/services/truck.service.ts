import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../conectDB";
import { CreateTruckDTO, UpdateTruckDTO } from "../model/truck.dto";
import Truck from "../model/truck.entity";
import { BadRequestError, NotFoudError } from "../../errors";

export class TruckService {
    nameCollection = "trucks"
    async createTruck(createTruckDTO: CreateTruckDTO) {
        try {
            const truckCollection = (await connectToDatabase()).collection(this.nameCollection);
            createTruckDTO.user_id = new ObjectId(createTruckDTO.user_id)

            const result = await truckCollection.insertOne(createTruckDTO)
            console.log(result)
            return {
                _id: result.insertedId,
                user_id: createTruckDTO.user_id,
                year: createTruckDTO.year,
                color: createTruckDTO.color,
                plates: createTruckDTO.plates
            }
        } catch (error) {
            throw error
        }
    }
    async listTrucks() {
        try {
            const truckCollection = (await connectToDatabase()).collection(this.nameCollection);
            const trucks = await truckCollection.find({}).toArray() as Truck[]
            return trucks
        } catch (error) {
            throw error

        }

    }
    async updateTruck(updateTruckDTO: UpdateTruckDTO) {
        try {
            updateTruckDTO._id = new ObjectId(updateTruckDTO._id)
            const truckCollection = (await connectToDatabase()).collection(this.nameCollection);
            const truck = await truckCollection.findOne({ _id: updateTruckDTO._id })
            if (!truck) {
                throw new NotFoudError("no se a encontrado el truck")
            }

            const update = Object.fromEntries( //elimina los atributos undefined
                Object.entries(updateTruckDTO).filter(([_, value]) => value !== undefined)
            );

            const result = await truckCollection.updateOne(
                { _id: updateTruckDTO._id },
                { $set: update }
            )
            if (result.matchedCount === 0) {
                throw new Error("No se pudo actualizar el camión");
            }
            return result.matchedCount
        } catch (error) {
            throw error

        }

    }
    async deleteTruck(_id: string) {
        try {
            const truckCollection = (await connectToDatabase()).collection(this.nameCollection);
            const objectId = new ObjectId(_id);
            const result = await truckCollection.deleteOne({ _id: objectId });

            return result;
        } catch (error) {
            throw error

        }
    }

}
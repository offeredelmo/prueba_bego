import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../conectDB";
import { CreateOrderDto, UpdateStatusDto } from "../model/order.entity";
import { NotFoudError } from "../../errors";
import { StatusOrders } from "../model/ordersDto";


export class OrderService {

    ordersCollection = "orders"
    userCollection = "users"
    trucCollection = "trucks"
    locationCollection = "location"




    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            let orderCollection = (await connectToDatabase()).collection(this.userCollection)
            if (!(await orderCollection.findOne({ _id: new ObjectId(createOrderDto.user) }))) {
                throw new NotFoudError(`El usuario con el id: ${createOrderDto.user} no se encontro`)
            } //veriifcar que existe el usuario
            orderCollection = (await connectToDatabase()).collection(this.trucCollection)
            if (!(await orderCollection.findOne({ _id: new ObjectId(createOrderDto.truck) }))) {
                throw new NotFoudError(`El truck con el id: ${createOrderDto.user} no se encontro`)
            } //veriifcar que existe el truck
            orderCollection = (await connectToDatabase()).collection(this.locationCollection)
            if (!(await orderCollection.findOne({ _id: new ObjectId(createOrderDto.pickup) }))) {
                throw new NotFoudError(`Pickup: La location con el id: ${createOrderDto.pickup} no se encontro`)
            } //veriifcar que existe la Location existe
            if (!(await orderCollection.findOne({ _id: new ObjectId(createOrderDto.dropoff) }))) {
                throw new NotFoudError(`Dropoff: La location con el id: ${createOrderDto.dropoff} no se encontro`)
            } //veriifcar que existe la Location existe
            createOrderDto.user = new ObjectId(createOrderDto.user)
            createOrderDto.truck = new ObjectId(createOrderDto.truck)
            createOrderDto.pickup = new ObjectId(createOrderDto.pickup)
            createOrderDto.dropoff = new ObjectId(createOrderDto.dropoff)

            orderCollection = (await connectToDatabase()).collection(this.ordersCollection)
            const result = await orderCollection.insertOne(createOrderDto)
            if (result.acknowledged === true) {
                return {
                    order: {
                        user: createOrderDto.user,
                        truck: createOrderDto.truck,
                        status: createOrderDto.status,
                        pickup: createOrderDto.pickup,
                        dropoff: createOrderDto.dropoff
                    }
                }
            } else {
                throw Error("No se a podido agregar la order")
            }
        } catch (error) {
            throw error;
        }
    }

    async listOrders() {
        try {
            const orderCollection = (await connectToDatabase()).collection(this.ordersCollection)
            const result = await orderCollection.find({}).toArray()
            return result
        } catch (error) {
            throw error;
        }

    }

    async changeStatus(updateStatusDto: UpdateStatusDto) {
        try {
        const orderCollection = (await connectToDatabase()).collection(this.ordersCollection)

        const orderChanged = await orderCollection.findOneAndUpdate(
            {_id: new ObjectId(updateStatusDto._id)},
            { $set: {status: updateStatusDto.status}},
            { returnDocument: "after" }
        )
        if (orderChanged === null) {
            throw new NotFoudError(`no se encontro la orden con el id: ${updateStatusDto._id}`)
        }
        console.log("acabe")
        console.log(orderChanged)
     
        } catch (error) {
            throw error
        }
    }

}
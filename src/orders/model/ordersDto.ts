import { ObjectId } from "mongodb";

export enum StatusOrders {
    CREATE = "create",
    INTRANSIT = "in transit",
    COMPLETED = "completed"
}

export class OrderEntity {
    user: ObjectId;
    truck: ObjectId;
    status: StatusOrders;
    pickup: ObjectId;
    dropoff: ObjectId;
    constructor(
        user: ObjectId,
        truck: ObjectId,
        status: StatusOrders,
        pickup: ObjectId,
        dropoff: ObjectId,
    ) {
        this.user = user,
            this.truck = truck,
            this.status = status,
            this.pickup = pickup,
            this.dropoff = dropoff
    }
}
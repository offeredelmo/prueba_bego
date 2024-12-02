import { ObjectId } from "mongodb";
import { StatusOrders } from "./ordersDto";
import { IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { Transform } from "class-transformer";


export class CreateOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    user: ObjectId;
    @IsNotEmpty()
    @IsMongoId()
    truck: ObjectId;
    @IsNotEmpty()
    @IsEnum(StatusOrders)
    status: StatusOrders;
    @IsNotEmpty()
    @IsMongoId()
    pickup: ObjectId;
    @IsNotEmpty()
    @IsMongoId()
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

export class UpdateOrderDto {

    @IsNotEmpty()
    @IsMongoId()
    @Transform(({value}) => new ObjectId(value))
    _id: ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({value}) => new ObjectId(value))
    user?: ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({value}) => new ObjectId(value))
    truck?: ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(StatusOrders)
    status?: StatusOrders;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({value}) => new ObjectId(value))
    pickup?: ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({value}) => new ObjectId(value))
    dropoff?: ObjectId;
    constructor(
        _id: ObjectId,
        user?: ObjectId,
        truck?: ObjectId,
        status?: StatusOrders,
        pickup?: ObjectId,
        dropoff?: ObjectId,
    ) {
        this._id = _id
        this.user = user,
            this.truck = truck,
            this.status = status,
            this.pickup = pickup,
            this.dropoff = dropoff
    }
}

export class UpdateStatusDto {
    @IsNotEmpty()
    @IsMongoId()
    _id: ObjectId;

    @IsNotEmpty()
    @IsEnum(StatusOrders)
    status: string;

    constructor(
        _id: ObjectId,
        status: StatusOrders
    ) {
        this._id = _id
        this.status = status
    }
} 
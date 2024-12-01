import { IsMongoId, isNotEmpty, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateLocationDto {

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    place_id: string;

    
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    
    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    user_id: ObjectId;

    constructor(
        address: string,
        place_id: string,
        latitude: number,
        longitude: number,
        user_id: ObjectId
    ) {
        this.address = address,
        this.place_id = place_id,
        this.latitude = latitude,
        this.longitude = longitude,
        this.user_id = user_id
    }
}

export class UpdateLocationDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    place_id?: string;

    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    latitude?: number;

    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @IsNotEmpty()
    user_id?: ObjectId;

    constructor(
        address?: string,
        place_id?: string,
        latitude?: number,
        longitude?: number,
        user_id?: ObjectId
    ) {
        this.address = address,
        this.place_id = place_id,
        this.latitude = latitude,
        this.longitude = longitude,
        this.user_id = user_id
    }
}
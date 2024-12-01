import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";
import { ObjectId } from "mongodb";





export class CreateTruckDTO {
   
    @IsNotEmpty()
    @IsMongoId()
    user_id: ObjectId;

    @IsNotEmpty()
    @IsString()
    year: string;

    @IsNotEmpty()
    @IsNumber()
    color: number;

    @IsNotEmpty()
    @IsString()
    plates: string;

    constructor(
       
        user_id: ObjectId,
        year: string,
        color: number,
        plates: string,
    ) {
        this.user_id = user_id
        this.year = year
        this.color = color
        this.plates = plates
    }
}

export class UpdateTruckDTO {
    @IsNotEmpty()
    @IsMongoId()
    _id: ObjectId;


    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    user_id?: ObjectId;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    year?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    color?: number;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    plates?: string;

    constructor(
        _id: ObjectId,
        user_id?: ObjectId,
        year?: string,
        color?: number,
        plates?: string,
    ){
        this._id = _id
        this.user_id = user_id
        this.year = year
        this.color = color
        this.plates = plates
    }
}
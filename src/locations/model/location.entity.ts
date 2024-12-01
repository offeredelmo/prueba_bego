import { ObjectId } from "mongodb";

export class LocationEntity {

    address: string;

    place_id: string;

    
    latitude: number;

    
    longitude: number;

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
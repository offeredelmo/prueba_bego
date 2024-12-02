import { ObjectId } from "mongoose";



export default class Truck {
    constructor(
        user_id: ObjectId,
        year : string, 
        color : number, 
        plates : string, 
        id?: ObjectId
    ) { }
}
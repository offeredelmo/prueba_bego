import { ObjectId } from "mongodb";


export default class Users {
    constructor(
        email: string,
        password: string,
        id?: ObjectId,
    ) {}

    static async initializeSchema(db: any,) {
        const collection = db.collection("users");
        await collection.createIndex({ email: 1 }, { unique: true }); 
        console.log(`indice email listo users`);
    }
}
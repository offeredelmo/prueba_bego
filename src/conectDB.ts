import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Users from "./users/model/user.entity";


let db: mongoDB.Db | null = null; // Inicialmente null
let client: mongoDB.MongoClient | null = null; // Inicialmente null

export async function connectToDatabase(): Promise<mongoDB.Db> {
    if (db && client) {
        return db;
    }
    client = new mongoDB.MongoClient(process.env.MONGO_URI || "");
    await client.connect();
    db = client.db(process.env.DB_NAME);
    //crear unikey
    await Users.initializeSchema(db);
    console.log("Conexión establecida");
    return db;
}
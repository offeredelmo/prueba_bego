import express from "express";
import dotenv from 'dotenv';
import { connectToDatabase } from "./conectDB";
import { userRouters } from "./users/routes";
dotenv.config();

if (!process.env.PORT || !process.env.MONGO_URI) {
    throw new Error('Falta configurar alguna variable de entorno');
  }
connectToDatabase()
const app = express();
app.use(express.json());

const apiPrefix = "/api/v1"


app.use(`${apiPrefix}/users`, userRouters)
app.listen(process.env.PORT || 3000, () => console.log("Api ejecutandose localhost:3000"))

console.log(`localhost:3000/${apiPrefix}/users`)
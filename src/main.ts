import express from "express";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.MONGO_URI) {
    throw new Error('Falta configurar alguna variable de entorno');
  }

const app = express();

app.listen(process.env.PORT || 4000, () => console.log("Api ejecutandose en el puerto 3000"))
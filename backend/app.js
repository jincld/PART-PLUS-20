// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";
import clientsRoutes from "./src/routes/clientsRoutes.js";
import reservationsRoutes from "./src/routes/reservationsRoutes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

// Creo una constante que es igual a la libreria que importé
const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());


const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./PARTPLUS_API.json"), "utf-8")
);

// Definir las rutas de las funciones que tendrá el sistema
app.use("/api/clients", clientsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exporto la constante para poder usar express en otros archivos
export default app;
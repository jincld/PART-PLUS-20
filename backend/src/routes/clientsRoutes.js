import express from "express";
import clientsController from "../controllers/clientsController.js";

// Router para manejar las rutas relacionadas con clientes
const router = express.Router();

// Rutas para obtener todos los clientes y crear nuevos
router
  .route("/")
  .get(clientsController.getClients)
  .post(clientsController.registerClients);

// Rutas para obtener, actualizar o eliminar un cliente específico por su ID
router
  .route("/:id")
  .get(clientsController.getClientID)  // Obtener un cliente por ID
  .put(clientsController.updateClients)  // Actualizar un cliente
  .delete(clientsController.deleteClients);  // Eliminar un cliente

export default router;
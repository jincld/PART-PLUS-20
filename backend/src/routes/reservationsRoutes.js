import express from "express";
import reservationsController from "../controllers/reservationsController.js";

// Router para manejar las rutas relacionadas con clientes
const router = express.Router();

// Rutas para obtener todos los clientes y crear nuevos
router
    .route("/")
    .get(reservationsController.getReservations)
    .post(reservationsController.registerReservations);

// Rutas para obtener, actualizar o eliminar un cliente específico por su ID
router
    .route("/:id")
    .get(reservationsController.getReservationID)  // Obtener un cliente por ID
    .put(reservationsController.updateReservations)  // Actualizar un cliente
    .delete(reservationsController.deleteReservations);  // Eliminar un cliente

export default router;
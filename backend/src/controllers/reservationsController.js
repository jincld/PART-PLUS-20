const reservationsController = {};
import reservationsModel from "../models/reservations.js";
import mongoose from "mongoose";

// Validar ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET - Obtener todas las reservas
reservationsController.getClients = async (req, res) => {
  try {
    const reservations = await reservationsModel.find().populate("clientId");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "No se encontraron reservas." });
  }
};

// POST - Registrar nueva reserva
reservationsController.registerClients = async (req, res) => {
  const { clientId, vehicle, service, status } = req.body;

  try {
    if (!clientId || !vehicle || !service || !status) {
      return res.status(400).json({ message: "Complete todos los campos." });
    }

    if (!isValidObjectId(clientId)) {
      return res.status(400).json({ message: "ID de cliente no válido." });
    }

    const newReservation = new reservationsModel({
      clientId,
      vehicle,
      service,
      status,
    });

    await newReservation.save();

    res.status(201).json({ message: "Reserva registrada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registrando reserva." });
  }
};

// DELETE - Eliminar reserva por ID
reservationsController.deleteClients = async (req, res) => {
  try {
    const deleted = await reservationsModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }
    res.json({ message: "Reserva eliminada correctamente." });
  } catch (error) {
    console.error("Error eliminando reserva:", error);
    res.status(500).json({ message: "Error eliminando reserva." });
  }
};

// PUT - Actualizar reserva por ID
reservationsController.updateClients = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;

    if (!clientId || !vehicle || !service || !status) {
      return res.status(400).json({ message: "Complete todos los campos." });
    }

    if (!isValidObjectId(clientId)) {
      return res.status(400).json({ message: "ID de cliente no válido." });
    }

    const updated = await reservationsModel.findByIdAndUpdate(
      req.params.id,
      {
        clientId,
        vehicle,
        service,
        status,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    res.json({ message: "Reserva actualizada con éxito.", updated });
  } catch (error) {
    console.error("Error actualizando reserva:", error);
    res.status(500).json({ message: "Error actualizando reserva." });
  }
};

export default reservationsController;

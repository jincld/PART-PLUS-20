const clientsController = {};
import clientsModel from "../models/clients.js";
import bcryptjs from "bcryptjs";

// Función para validar el formato del email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// GET - Obtener clientes
clientsController.getClients = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    res.status(200).json(clients);
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: "No se encontraron clientes." });
  }
};

// POST - Registrar cliente
clientsController.registerClients = async (req, res) => {
  const { name, email, password, age, phone } = req.body;

  try {
    if (!name || !email || !password || !age || !phone) {
      return res.status(400).json({ message: "Complete todos los campos." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Email no válido." });
    }

    if (age < 18) {
      return res.status(400).json({ message: "Debe de tener más de 18 años." });
    }

    if (name.length < 3 || password.length < 3) {
      return res.status(400).json({ message: "Debe tener al menos 3 caracteres." });
    }

    const existClient = await clientsModel.findOne({ email });
    if (existClient) {
      return res.status(400).json({ message: "El cliente ya existe." });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientsModel({
      name,
      email,
      password: passwordHash,
      age,
      phone,
    });

    await newClient.save();

    res.status(201).json({ message: "Cliente registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registrando cliente" });
  }
};

// DELETE - Eliminar cliente
clientsController.deleteClients = async (req, res) => {
  try {
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
    if (!deleteClient) {
      return res.status(404).json({ message: "Cliente no encontrado, error eliminando." });
    }
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error eliminando cliente:", error);
    res.status(500).json({ message: "Error eliminando cliente" });
  }
};

// PUT - Actualizar cliente
clientsController.updateClients = async (req, res) => {
  try {
    const { name, email, password, age, phone } = req.body;

    // Validaciones
    if (!name || !email || !age || !phone) {
      return res.status(400).json({ message: "Complete todos los campos requeridos." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Email no válido." });
    }

    if (age < 18) {
      return res.status(400).json({ message: "Debe de tener más de 18 años." });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres." });
    }


    // Si se proporciona una nueva contraseña, encriptarla
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);  // Se cifra la contraseña con 10 rondas
    }

    const updatedClient = await clientsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password:hashedPassword,
        age,
        phone,
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    res.json({ message: "Cliente actualizado con éxito.", updatedClient });
  } catch (error) {
    console.error("Error actualizando cliente:", error);
    res.status(500).json({ message: "Error actualizando cliente." });
  }
};

export default clientsController;

import express from "express";
import { agregarCliente, obtenerClientes, obtenerCliente, editarCliente, eliminarCliente } from "../controllers/clienteController.js";

const router = express.Router()

router.get("/", obtenerClientes)
router.post("/", agregarCliente)
router.get("/:id", obtenerCliente)
router.put("/:id", editarCliente)
router.delete("/:id", eliminarCliente)



export default router
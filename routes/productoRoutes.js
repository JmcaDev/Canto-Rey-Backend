import express from "express";
import { obtenerProductos, obtenerProducto, agregarProducto, editarProducto, eliminarProducto } from "../controllers/productoController.js";

const router = express.Router();

router.get("/", obtenerProductos)
router.get("/:id", obtenerProducto)
router.put("/:id", editarProducto)
router.delete("/:id", eliminarProducto)
router.post("/", agregarProducto)

export default router
import express from "express";
import { obtenerVenta, obtenerVentas } from "../controllers/ventaController.js";

const router = express.Router()

router.get("/", obtenerVentas)
router.get("/:id", obtenerVenta)

export default router
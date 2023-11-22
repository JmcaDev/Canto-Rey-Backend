import express from "express";
import { agregarNotaEntrega, obtenerNotaEntrega, obtenerNotasEntrega } from "../controllers/notaEntregaController.js";

const router = express.Router()

router.get("/", obtenerNotasEntrega)
router.get("/:id", obtenerNotaEntrega)
router.post("/", agregarNotaEntrega)

export default router
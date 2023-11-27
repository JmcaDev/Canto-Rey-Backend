import express from "express";
import { registrar, autenticar, perfil } from "../controllers/usuarioController.js";


const router = express.Router()

router.post("/", registrar)
router.post("/login", autenticar)
router.get("/perfil", perfil)

export default router
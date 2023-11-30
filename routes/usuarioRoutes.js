import express from "express";
import { registrar, autenticar, perfil, confirmar, resetPassword, comprobarToken, nuevoPassword } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()

router.post("/", registrar)
router.post("/login", autenticar)
router.get("/confirmar/:token", confirmar)
router.post("/resetPassword", resetPassword)
router.get("/resetPassword/:token", comprobarToken)
router.post("/resetPassword/:token", nuevoPassword)
router.get("/perfil", checkAuth ,perfil)

export default router
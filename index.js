import express from "express";
import dotenv from "dotenv";
import conectarDb from "./config/db.js"
import productoRouter from "./routes/productoRoutes.js"
import clienteRouter from "./routes/clienteRoutes.js"
import notasEntregasRouter from "./routes/notaEntregaRoutes.js"

const app = express();
app.use(express.json())

//Variables entorno
dotenv.config();

//Conexion base de datos
conectarDb()

//Routing
app.use("/api/productos", productoRouter)
app.use("/api/clientes", clienteRouter)
app.use("/api/notasentregas", notasEntregasRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`servidor oyendo en el puerto ${PORT}`)
})

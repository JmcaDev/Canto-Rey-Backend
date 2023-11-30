import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDb from "./config/db.js"
import usuarioRouter from "./routes/usuarioRoutes.js"
import productoRouter from "./routes/productoRoutes.js"
import clienteRouter from "./routes/clienteRoutes.js"
import notasEntregasRouter from "./routes/notaEntregaRoutes.js"
import ventasRouter from "./routes/ventaRoutes.js"

const app = express();
app.use(express.json())

//Variables entorno
dotenv.config();

//Conexion base de datos
conectarDb()

//Configurar cors
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Error de cors"))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use("/api/usuarios", usuarioRouter)
app.use("/api/productos", productoRouter)
app.use("/api/clientes", clienteRouter)
app.use("/api/notasentregas", notasEntregasRouter)
app.use("/api/ventas", ventasRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`servidor oyendo en el puerto ${PORT}`)
})

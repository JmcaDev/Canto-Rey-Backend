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

//Routing
app.use("/api/usuarios", usuarioRouter)
app.use("/api/productos", productoRouter)
app.use("/api/clientes", clienteRouter)
app.use("/api/notasentregas", notasEntregasRouter)
app.use("/api/ventas", ventasRouter)

const PORT = process.env.PORT || 4000

//Configurar CORS
const whiteList = ["http://localhost:5173"]

const corsOptions = {
    origin: function(origin, callback){
        console.log(origin)
        if(whiteList.includes(origin)){
            //Puede consultar la api
        }else{
            //No esta permitido
        }
    }
}

app.use(cors(corsOptions))

app.listen(PORT, () => {
    console.log(`servidor oyendo en el puerto ${PORT}`)
})

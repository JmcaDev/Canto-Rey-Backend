import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    rif: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
        trim:true
    },
    telefono: {
        type: String,
        required: false,
        trim: true
    }
})

const Cliente = mongoose.model("Cliente", clienteSchema)
export default Cliente
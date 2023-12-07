import mongoose from "mongoose";

const ventaSchema = mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto"
    },
    id:{
        type: String,
        required: true
    },
    nombreProducto: {
        type: String,
        required: true,
        trim: true
    },
    cantKg: {
        type: String,
        required: true,
        trim: true
    },
    precioKg: {
        type: String,
        required: true,
        trim: true
    },
    montoProducto: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
})

const Venta = mongoose.model("Venta", ventaSchema)
export default Venta
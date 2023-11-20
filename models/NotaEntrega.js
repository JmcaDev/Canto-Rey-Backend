import mongoose from "mongoose";

const notaEntregaSchema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente"
    },
    fechaOrden: {
        type: Date,
        default: Date.now()
    },
    cantKg: {
        type: String,
        required: true,
        trim: true
    },
    productos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto"
        }
    ],
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
    montoTotal: {
        type: String,
        required: true,
        trim: true
    }
})
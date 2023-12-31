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
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
            },
            id: {
                type: String,
                required: true,
                trim: true
            },
            idProducto: {
                type: String,
                required: true,
                trim: true
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
        }
    ],
    montoTotal: {
        type: String,
        required: true,
        trim: true
    }
})

const NotaEntrega = mongoose.model("Nota_Entrega", notaEntregaSchema)
export default NotaEntrega
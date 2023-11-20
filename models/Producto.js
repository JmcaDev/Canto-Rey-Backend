import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
})

const Producto = mongoose.model("Producto", productoSchema)
export default Producto
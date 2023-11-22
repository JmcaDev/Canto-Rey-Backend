import mongoose from "mongoose";
import NotaEntrega from "../models/NotaEntrega.js"
import Venta from "../models/Venta.js"

const obtenerNotasEntrega = async (req, res) => {
    const notasEntregas = await NotaEntrega.find({})
    res.json(notasEntregas)
}

const obtenerNotaEntrega = async (req,res) => {
    const {id} = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Nota de entrega no existe")
        return res.status(404).json({msg: error.message})
    }

    const notaEntrega = await NotaEntrega.findById(id)
    if(!notaEntrega){
        const error = new Error("Nota de entrega no existe")
        return res.status(404).json({msg: error.message})
    }

    res.json(notaEntrega)
}

const agregarNotaEntrega = async (req, res) =>{
    const {productos} = req.body
    await productos.forEach((producto) => {
        const venta = new Venta(producto)
        venta.save()
    });
    try {
        const notaEntrega = new NotaEntrega(req.body)
        await notaEntrega.save()
        res.json({msg: "Nota de entrega agregada exitosamente"})
    } catch (error) {
        console.log(error)
    }
}

export{
    agregarNotaEntrega,
    obtenerNotasEntrega,
    obtenerNotaEntrega
}
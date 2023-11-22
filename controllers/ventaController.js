import mongoose from "mongoose";
import Venta from "../models/Venta.js";

const obtenerVentas = async (req, res) => {
    const ventas = await Venta.find({})
    res.json(ventas)
}

const obtenerVenta = async (req,res) => {
    const {id} = req.params
    
    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Venta no existe")
        res.status(404).json({msg: error.message})
    }

    const venta = await Venta.findById(id)
    if(!venta){
        const error = new Error("Venta no existe")
        return res.status(404).json({msg: error.message})
    }

    res.json(venta)
}

export{
    obtenerVentas,
    obtenerVenta
}
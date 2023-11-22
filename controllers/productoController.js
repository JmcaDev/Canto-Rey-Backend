import mongoose from "mongoose";
import Producto from "../models/Producto.js";

//Metodo Get - Obtener Productos
const obtenerProductos = async (req,res) => {
    const productos = await Producto.find({})
    res.json(productos)
}

//Metodo Get - Obtener producto en especifico
const obtenerProducto = async (req,res) => {
    const { id } = req.params
    
    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Producto no existe")
        return res.status(404).json({msg: error.message})
    }
    
    const producto = await Producto.findById(id)
    if(!producto){
        const error = new Error ("Producto no encontrado")
        return res.status(404).json({msg: error.message})
    }

    res.json(producto)
}

//Metodo POST - agregar productos
const agregarProducto = async (req,res) => {
    const { nombre } = req.body
    const existeProducto = await Producto.findOne({nombre})

    if(existeProducto){
        const error = new Error("Producto ya registrado")
        return res.status(400).json({msg: error.message})
    }

    try {
        const producto = new Producto(req.body)
        await producto.save()
        res.json({msg: "Producto agregado exitosamente"})
    } catch (error) {
        console.log(error)
    }
}

//Metodo PUT - actualizar producto
const editarProducto = async (req, res) => {
    const {id} = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Producto no existe")
        return res.statu(404).json({msg: error.message})
    }

    const producto = await Producto.findById(id)
    if(!producto){
        const error = new Error("Producto no existe")
        return res.status(404).json({msg: error.message})
    }

    producto.nombre = req.body.nombre || producto.nombre
    
    try{
        const productoAlmacenado = await producto.save()
        res.json(productoAlmacenado)
    }catch(error){
        console.log(error)
    }
}

//Metodo DELETE - Eliminar producto
const eliminarProducto = async (req,res) => {
    const { id } = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Producto no existe")
        return res.statu(404).json({msg: error.message})
    }
    
    const producto = await Producto.findById(id)
    if(!producto){
        const error = new Error("Producto no existe")
        return res.status(404).json({msg: error.message})
    }

    try{
        await producto.deleteOne()
        res.json({msg: "Producto eliminado"})
    }catch(error){
        console.log(error)
    }

} 

export{
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    editarProducto,
    eliminarProducto
}
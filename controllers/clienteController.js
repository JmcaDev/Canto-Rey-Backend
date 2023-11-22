import mongoose from "mongoose"
import Cliente from "../models/Cliente.js"

//Metodo Get - Obtener todos los clientes
const obtenerClientes =  async (req, res) => {
    const clientes = await Cliente.find({})
    res.json(clientes)
}

// Metodod Get - Obtener un cliente
const obtenerCliente = async (req, res) => {
    const {id} = req.params
    
    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Cliente no existe")
        return res.status(404).json({msg: error.message})
    }
    
    const cliente = await Cliente.findById(id)
    if(!cliente){
        const error = new Error ("Cliente no encontrado")
        return res.status(404).json({msg: error.message})
    }

    res.json(cliente)
}

// Metodo POST - Agregar un cliente
const agregarCliente = async (req,res) => {
    const {rif} = req.body
    const existeCliente = await Cliente.findOne({rif})

    if(existeCliente){
        const error = new Error("Cliente ya registrado")
        return res.status(400).json({msg: error.message})
    }

    try {
        const cliente = new Cliente(req.body)
        await cliente.save()
        res.json({msg: "Cliente agregado exitosamente"})
    } catch (error) {
        console.log(error)
    }
}

//Metodo PUT - actualizar un cliente
const editarCliente = async (req, res) =>{
    const {id} = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Cliente no existe")
        return res.status(404).json({msg: error.message})
    }

    const cliente = await Cliente.findById(id)
    if(!cliente){
        const error = new Error("Cliente no existe")
        return res.status(404).json({msg:error.message})
    }

    cliente.nombre = req.body.nombre || cliente.nombre
    cliente.rif = req.body.rif || cliente.rif
    cliente.direccion = req.body.direccion || cliente.direccion
    cliente.telefono = req.body.telefono || cliente.telefono

    try {
        const clienteAlmacenado = await cliente.save()
        res.json(clienteAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

//Metodo DELETE - Eliminar un cliente
const eliminarCliente = async (req, res) => {
    const {id} = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error("Cliente no existe")
        return res.status(404).json({msg: error.message})
    }

    const cliente = await Cliente.findById(id)
    if(!cliente){
        const error = new Error("Cliente no existe")
        return res.status(404).json({msg: error.message})
    }

    try{
        await Cliente.deleteOne()
        res.json({msg: "Cliente Eliminado"})
    }catch(error){
        console.log(error)
    }
}

export{
    obtenerClientes,
    obtenerCliente,
    agregarCliente,
    editarCliente,
    eliminarCliente
}
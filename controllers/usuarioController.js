import Usuario from "../models/Usuario.js"
import generarJWT from "../helpers/generarJWT.js"

const registrar = async (req,res) => {
    //Evitar registros duplicados
    const {email} = req.body
    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario){
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body)
        await usuario.save()

        res.json({msg: "Usuario creado exitosamente"})
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async(req,res) => {
    const {email, password} = req.body
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error("El usuario no existe")
        res.status(404).json({msg: error.message})
    }

    //Comprobar password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    }else{
        const error = new Error("Password incorrecto")
        return res.status(403).json({msg: error.message})
    }
}

const perfil = async(req,res) => {
    const {usuario} = req

    res.json(usuario)
}

export{
    registrar,
    autenticar,
    perfil
}
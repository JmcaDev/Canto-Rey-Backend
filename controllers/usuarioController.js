import Usuario from "../models/Usuario.js"
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarId.js"
import { emailRegistro, emailResetPassword } from "../helpers/emails.js"

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
        usuario.token = generarId()
        await usuario.save()

        //Enviar email confirmacion
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

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

const confirmar = async (req,res) => {
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({token})

    if (!usuarioConfirmar) {
        const error = new Error("Token Invalido")
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({ msg: "Usuario Confirmado Exitosamente" })
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error("Usuario no existe")
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save()

        //*Enviar correo
        emailResetPassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg: "Se ha enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) =>{
    const {token} = req.params
    const tokenValido = await Usuario.findOne({token})

    if(tokenValido){
        res.json({msg: "Token valido y el Usuario existe"})
    }else{
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}

const nuevoPassword = async (req, res) =>{
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({token})
    if(usuario){
        usuario.password = password
        usuario.token = ""
        try {
            await usuario.save()
            res.json({msg: "Password cambiada correctamente"})
        } catch (error) {
            console.log(error)
        }
    }else{
        const error = new Error("Token no válido")
        return res.status(404).json({msg: error.message})
    }
}

export{
    registrar,
    autenticar,
    confirmar,
    comprobarToken,
    resetPassword,
    nuevoPassword,
    perfil
}
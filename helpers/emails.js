import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "661287d2be3f51",
            pass: "8ff5a91c8db669"

        }
    })

    //Informacion email

    const info = await transport.sendMail({
        from: '"Canto Rey, C.A. - Notas de entrega" <sistema@cantorey.com',
        to: email,
        subject: "Canto Rey - Verificar Cuenta",
        text: "Confirma tu cuenta en Canto Rey",
        html:`<p>Hola: ${nombre} Verifica tu cuenta en Canto Rey</p>
        <p>Tu cuenta ya casi esta lista, solo pulsa el siguiente enlace para verificarla:
        
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Verificar cuenta</a>
        </p>
        <p>Si usted no creo esta cuenta, ignore este correo</p>`,
    })
}

export const emailResetPassword = async (datos) => {
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "661287d2be3f51",
            pass: "8ff5a91c8db669"

        }
    })

    //Informacion email

    const info = await transport.sendMail({
        from:'"Canto Rey - Notas de Entrega" <sistema@cantorey.com>',
        to: email,
        subject: "Canto Rey - Restablecer password",
        text:"Restablece tu password",
        html:`<p>Hola: ${nombre} has solicitado restablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password:
        
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a>
        </p>
        <p>Si usted no solicito este email, ignore este correo</p>
        `,
    })
}
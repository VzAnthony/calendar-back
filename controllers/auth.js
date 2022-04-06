const { response } = require('express')
const bcrypt = require('bcryptjs')
const UserModel = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req , res = response) => {
    const { email, password } = req.body

    try {

        let user = await UserModel.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        user = new UserModel(req.body)

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        
        await user.save()

        // Generara JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            udi: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const userLogin = async(req , res = response) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario y contraseña incorrecto'
            })
        }

        // Confirmas los passwords
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario y contraseña incorrectoo',
            })
        }

        // Generar un JWT
        const token = await generateJWT(user.id, user.name)
        
    
        res.status(200).json({
            ok: true,
            msg: 'login',
            email,
            password,
            token,
            uid: user.id,
            name: user.name
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const tokenRefresh = async (req , res = response) => {

    const {uid, name} = req

    //Generar JWT
    const token = await generateJWT(uid, name)


    res.json({
        ok: true,
        msg: 'renew',
        token
    })
}

module.exports = { 
    createUser,
    userLogin,
    tokenRefresh
}
const { response } = require('express')
const UserModel = require('../models/User')

const createUser = async(req , res = response) => {
    // const { name, email, password } = req.body
    const user = new UserModel(req.body)
    
    await user.save()

    res.status(201).json({
        ok: true,
        msg: 'register',
    })
}

const userLogin = (req , res = response) => {
    const { email, password } = req.body

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const tokenRefresh = (req , res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = { 
    createUser,
    userLogin,
    tokenRefresh
}
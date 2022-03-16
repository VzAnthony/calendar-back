// Rutas de usuario / auth 
    // host + /api/auth

const {Router} = require('express')
const { check } = require('express-validator')

const { createUser, userLogin, tokenRefresh } = require('../controllers/auth')
const {fieldValidator} = require('../middlewares/fieldValidator')

const router = Router()



router.post(
    '/new',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener 6 caracteres').isLength({min: 6}),
        fieldValidator
    ],
    createUser
 )

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener 6 caracteres').isLength({min: 6}),
        fieldValidator        
    ],
    userLogin
)

router.get('/renew', tokenRefresh)

module.exports = router

// Rutas de usuario / events
    // host + /api/events

const { Router } = require("express");
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require('express-validator');
const { fieldValidator } = require("../middlewares/fieldValidator");
const { isDate } = require("../helpers/isDate");

const router = Router()


// Todas estas peticiones deben de ser validades por el JWT
router.use(validateJWT)

// Obtener eventos
router.get('/', getAllEvents)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatario').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        fieldValidator
    ],
    createEvent
    )


// Actualizar un evento
router.put('/:id', updateEvent)

// Eliminar un evento
router.delete('/:id', deleteEvent)

module.exports = router

const { response } = require("express")
const EventModel = require('../models/Event')



const getAllEvents = async(req, res = response) => {
    const events = await EventModel.find().populate('user', 'name')

    res.status(200).json({
        ok: true,
        events
    })
} 

const createEvent = async (req, res = response) => {

    const event = new EventModel(req.body)    
    
    try {
        event.user = req.uid
        const eventDB = await event.save()

        res.status(200).json({
            ok: true,
            eventDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
} 

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await EventModel.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "No hay un evento por ese id"
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilgio de editar esta informacion"
            })
        }


        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await EventModel.findByIdAndUpdate(eventId, newEvent, {new: true})

        res.status(200).json({
            ok: true,
            event: updateEvent
        })

        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Contacta con un Administrador'
        })
    }


} 

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await EventModel.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "No hay un evento por ese id"
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilgio de editar esta informacion"
            })
        }

        await EventModel.findByIdAndDelete(eventId)

        res.status(200).json({
            ok: true,
            msn: 'Evento eliminado'
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Contacta con un Administrador'
        })
    }

} 

module.exports = {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()


// CREAR SERVIDOR DE EXPRESS

const app = express()

// Base de datos
dbConnection()


// Directorio Publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))


// Escuchar Peticiones 

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 4000')


    const matriz1 = [[0,0,0,0], [0,0,0,0]] // por poner un ejemplo

    const matriz = [
        {
            cliente: 'Hotel Melia',
            semanaPrimerPedido: 1,
            1: 2734,
            2: 3847,
            3: null,
            4: 12,
            5: 12,
            6:2,
            7: 4,
            8: null,
            9: 12,
            10: 2,
        },
    ]

    
const test = matriz.map(client => {
    const numberKeys = Object.keys(client)
    let count = 0
    const number = numberKeys.length - 2
    for (let i = 1; i < number; i++) {
        if(client[i] && client[i+1]) {
            count = 1 + count
        }
    }
    return count
})

console.log(test)
})
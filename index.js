const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
require('dotenv').config()


// CREAR SERVIDOR DE EXPRESS

const app = express()

// CORS
app.use(cors())

// Base de datos
dbConnection()


// Directorio Publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

// Redireccionar a los routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/events', require('./routes/events'))


// Escuchar Peticiones 

app.listen(process.env.PORT, () => {
    
    console.log('Servidor corriendo en el puerto 4000')

})
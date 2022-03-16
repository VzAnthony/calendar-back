const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online')
    }
    catch(error){
        console.log('error al inicializar base de datos', error)
    }
}

module.exports = {
    dbConnection
}
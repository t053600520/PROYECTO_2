const mongoose = require('mongoose')

const Pais = mongoose.model('Pais', {
    PAIS: String,
    CAPITAL: String,
    MONEDA: String,
    IDIOMA: String,
    GOBIERNO: String,
    PRESIDENTE: String,
    POBLACION: Number,
})
module.exports = Pais
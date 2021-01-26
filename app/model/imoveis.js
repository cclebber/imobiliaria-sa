const Schema = require('mongoose').Schema;

const ImoveisSchema = new Schema({
    referecia:String,
    endereco: String,
    cep: Number,
    valor_aluguel: Number,
    valor_iptu: Number,
    proprietario: {
        nome: String,
        _id: ObjectId
    }
})

module.exports = ImoveisSchema;
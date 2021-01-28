const {Schema, model} = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const ImoveisSchema = new Schema({
    referencia:String,
    endereco: String,
    cep: Number,
    valor_aluguel: Number,
    valor_iptu: Number,
    proprietario: ObjectId
})

module.exports = model("imoveis", ImoveisSchema);
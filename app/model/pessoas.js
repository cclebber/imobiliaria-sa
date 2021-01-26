const {Schema, model} = require('mongoose');

const PessoasSchema = new Schema({
    nome: String,
    cpf: Number,
    data_nascimento: Date,
    endereco: String,
    pix:String,
    contato:Number,
})

module.exports = model("pessoas", PessoasSchema);
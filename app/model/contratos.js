const Schema = require('mongoose').Schema;

const ContratosSchema = new Schema({
    data_inicio: Date,
    data_final: Date,
    valor_aluguel: Number,
    valor_caucao: Number,
    data_pagamento: Number,
    inquilino: {
        nome: String,
        _id: ObjectId
    },
    imovel: {
        referencia: String,
        _id: ObjectId
    },
})

module.exports = ContratosSchema;
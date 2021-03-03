const {Schema, model} = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const ContratosSchema = new Schema({
    data_inicio: Date,
    data_final: Date,
    valor_aluguel: Number,
    valor_caucao: Number,
    data_pagamento: Number,
    inquilino: {
        type:ObjectId,
        ref:'pessoas'
    },
    imovel: {
        type: ObjectId,
        ref:'imoveis'
    },
})

module.exports = model("contratos", ContratosSchema);
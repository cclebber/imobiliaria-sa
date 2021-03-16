const {Schema, model} = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const ContratosSchema = new Schema({
    data_inicio: {
        type:Date,
        required:[true, 'Data de inicio é um campo obrigatrório!']
    },
    data_final: {
        type:Date,
        required:[true, 'Data de recisão é um campo obrigatrório!']
    },
    valor_aluguel: {
        type:Number,
        required:[true, 'Valor do aluguel é um campo obrigatrório!']
    },
    valor_caucao: {
        type:Number,
        required:[true, 'Valor de caução é um campo obrigatrório!']
    },
    data_pagamento: {
        type:Number,
        required:[true, 'Data de pagamento é um campo obrigatrório!']
    },
    inquilino: {
        type:ObjectId,
        ref:'pessoas',
        required:[true, 'Inquilino é um campo obrigatrório!']
    },
    imovel: {
        type: ObjectId,
        ref:'imoveis',
        required:[true, 'Imóvel é um campo obrigatrório!']
    },
})

module.exports = model("contratos", ContratosSchema);
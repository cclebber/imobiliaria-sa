const ContratosSchema = require("../model/contratos");
const ObjectId = require('mongoose').Types.ObjectId;

const ContratosServices = {

    insereContrato : async function(data){

        const newContrato= new ContratosSchema({
            data_inicio:data.data_inicio,
            data_final:data.data_final,
            valor_aluguel:data.valor_aluguel,
            valor_caucao:data.valor_caucao,
            data_pagamento:data.data_pagamento,
            inquilino:ObjectId(data.inquilino),
            imovel:{
                _id:ObjectId(data.imovel_id),
                referencia:data.imovel_referencia
            }
        })

        const insert = newContrato.save();

        if(!insert) throw "erro ao enserir";

        return insert;
    }
}

module.exports=ContratosServices;
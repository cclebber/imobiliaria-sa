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

        const insert = await newContrato.save();

        if(!insert) throw "erro ao enserir";

        return insert;
    },

    buscaContratos : async function(query){

        let queryParse={};

        if(query.referecia) queryParse.referecia = query.referecia;
        if(query.endereco) queryParse.endereco = query.endereco;
        if(query.cep) queryParse.cep = query.cep;
        if(query.valor_aluguel) queryParse.valor_aluguel = query.valor_aluguel;
        if(query.valor_iptu) queryParse.valor_iptu = query.valor_iptu;
        if(query.proprietario) queryParse.proprietario = query.proprietario;

        const contratos = await ContratosSchema.find(queryParse).limit(10);

        if(!contratos) throw "erro ao inserir";

        return contratos;

    }
}

module.exports=ContratosServices;
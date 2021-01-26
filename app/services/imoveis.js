const ImoveisSchema = require("../model/imoveis");
const ObjectId = require('mongoose').Types.ObjectId;

const ImoveisServices = {

    insereImovel : async function(data){

        const newImovel= new ImoveisSchema({
            referecia:data.referecia,
            endereco:data.endereco,
            cep:data.cep,
            valor_aluguel:data.valor_aluguel,
            valor_iptu:data.valor_iptu,
            proprietario: ObjectId(data.proprietario)
        })

        const insert = newImovel.save();

        if(!insert) throw "erro ao inserir";

        return insert;
    }
}

module.exports=ImoveisServices;
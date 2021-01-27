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

        const insert = await newImovel.save();

        if(!insert) throw "erro ao inserir";

        return insert;
    },

    buscaImoveis : async function(query){

        let queryParse={};

        if(query.referecia) queryParse.referecia = query.referecia;
        if(query.endereco) queryParse.endereco = query.endereco;
        if(query.cep) queryParse.cep = query.cep;
        if(query.valor_aluguel) queryParse.valor_aluguel = query.valor_aluguel;
        if(query.valor_iptu) queryParse.valor_iptu = query.valor_iptu;
        if(query.proprietario) queryParse.proprietario = query.proprietario;

        const imoveis = await ImoveisSchema.find(queryParse).limit(10);

        if(!imoveis) throw "erro ao inserir";

        return imoveis;

    }

}

module.exports=ImoveisServices;
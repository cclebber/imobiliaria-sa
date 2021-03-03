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
            imovel:ObjectId(data.imovel),
        })

        const insert = await newContrato.save();

        if(!insert) throw "erro ao enserir";

        return insert;
    },

    editarContrato: async (data) =>{
        let contrato = await ContratosSchema.findById(data.id);
        if(!contrato) throw "erro ao encontrar o contrato";

        contrato.data_inicio=data.data_inicio;
        contrato.data_final=data.data_final;
        contrato.valor_aluguel=data.valor_aluguel;
        contrato.valor_caucao=data.valor_caucao;
        contrato.data_pagamento=data.data_pagamento;
        contrato.inquilino=ObjectId(data.inquilino);
        contrato.imovel=ObjectId(data.imovel);
        let save = await contrato.save();
        if(!save) throw "erro ao editar";
        return save;
    },
    excluirContrato: async (query) => {
        console.info(query);
        let contrato = await ContratosSchema.deleteOne({_id:ObjectId(query.id)})
        console.info(contrato);
        if(!contrato) throw "erro ao excluir";
        return contrato;
    },

    buscaContrato: async (query) =>{
        let contrato=await ContratosSchema.findById(query.id).populate('inquilino').populate('imovel');
        if(!contrato) throw "erro ao consultar"
        return contrato;
    },

    buscaContratos : async function(query){

        let queryParse={};

        if(query.referecia) queryParse.referecia = query.referecia;
        if(query.endereco) queryParse.endereco = query.endereco;
        if(query.cep) queryParse.cep = query.cep;
        if(query.valor_aluguel) queryParse.valor_aluguel = query.valor_aluguel;
        if(query.valor_iptu) queryParse.valor_iptu = query.valor_iptu;
        if(query.inquilino) queryParse.inquilino = query.inquilino;

        const contratos = await ContratosSchema.find(queryParse).limit(10).populate('inquilino').populate('imovel');

        if(!contratos) throw "erro ao consultar";

        return contratos;
    }

}

module.exports=ContratosServices;
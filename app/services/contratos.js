const ContratosSchema = require("../model/contratos");
const PessoasSchema = require("../model/pessoas");
const ObjectId = require('mongoose').Types.ObjectId;
const pdf = require('pdf-creator-node')
const fs = require('fs')

const ContratosServices = {

    insereContrato : async (data) => {

        if(data.valor_caucao) data.valor_caucao=data.valor_caucao*1;
        if(data.valor_aluguel) data.valor_aluguel=data.valor_aluguel*1;
        if(data.data_pagamento) data.data_pagamento=data.data_pagamento*1;
        if(data.data_inicio) data.data_inicio=new Date(data.data_inicio);
        if(data.data_final) data.data_final=new Date(data.data_final);
        if(data.inquilino) data.inquilino=ObjectId(data.inquilino);
        if(data.imovel) data.imovel=ObjectId(data.imovel);

        const newContrato= new ContratosSchema({
            data_inicio:data.data_inicio,
            data_final:data.data_final,
            valor_aluguel:data.valor_aluguel,
            valor_caucao:data.valor_caucao,
            data_pagamento:data.data_pagamento,
            inquilino:data.inquilino,
            imovel:data.imovel,
        })

        const insert = await newContrato.save();

        if(!insert) throw "erro ao enserir";

        return insert;
    },

    editarContrato: async (data) =>{
        let contrato = await ContratosSchema.findById(data.id);
        if(!contrato) throw "erro ao encontrar o contrato";

        if(data.valor_caucao) data.valor_caucao=data.valor_caucao*1;
        if(data.valor_aluguel) data.valor_aluguel=data.valor_aluguel*1;
        if(data.data_pagamento) data.data_pagamento=data.data_pagamento*1;
        if(data.data_inicio) data.data_inicio=new Date(data.data_inicio);
        if(data.data_final) data.data_final=new Date(data.data_final);
        if(data.inquilino) data.inquilino=ObjectId(data.inquilino);
        if(data.imovel) data.imovel=ObjectId(data.imovel);

        contrato.data_inicio=data.data_inicio;
        contrato.data_final=data.data_final;
        contrato.valor_aluguel=data.valor_aluguel;
        contrato.valor_caucao=data.valor_caucao;
        contrato.data_pagamento=data.data_pagamento;
        contrato.inquilino=data.inquilino;
        contrato.imovel=data.imovel;
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
    },

    imprimirContrato: async function(query) {

     

        let contrato=await ContratosSchema.findById(query.id).populate('inquilino').populate('imovel').populate('imovel.proprietario').lean();
        if(!contrato) throw "erro ao consultar"

        contrato.imovel.proprietario = await PessoasSchema.findById(contrato.imovel.proprietario).lean();
        if(!contrato.imovel.proprietario) throw "erro ao encontrar o proprietario";

        console.info(contrato);

        const html = fs.readFileSync('public/contrato.html').toString()
        
        const options = {
            format: 'A4',
            orientation: 'portrait'
        }

        const document = {
            html: html,
            data: contrato,
            type:'buffer'
        }

        const buffer= await pdf.create(document, options).then()
        if(!buffer) throw "erro ao gerar o pdf"
        return buffer;

    }

}

module.exports=ContratosServices;
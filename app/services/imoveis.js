const ImoveisSchema = require("../model/imoveis");
const ContratosSchema = require("../model/contratos");
const ObjectId = require('mongoose').Types.ObjectId;
var  uid = require('uid').uid;

const ImoveisServices = {

    insereImovel : async function(data){

        if(data.valor_iptu) data.valor_iptu=data.valor_iptu*1;
        if(data.valor_aluguel) data.valor_aluguel=data.valor_aluguel*1;
        if(data.proprietario) data.proprietario=ObjectId(data.proprietario);

        const newImovel= new ImoveisSchema({
            referencia:uid(6),
            endereco:data.endereco,
            cep:data.cep,
            valor_aluguel:data.valor_aluguel,
            valor_iptu:data.valor_iptu,
            proprietario: data.proprietario
        })

        const insert = await newImovel.save();

        if(!insert) throw "erro ao inserir";

        return insert;
    },
    editarImovel: async (data) =>{
        let imovel = await ImoveisSchema.findById(data.id);
        if(!imovel) throw "erro ao encontrar o imóvel";

        if(data.valor_iptu) data.valor_iptu=data.valor_iptu*1;
        if(data.valor_aluguel) data.valor_aluguel=data.valor_aluguel*1;
        if(data.proprietario) data.proprietario=ObjectId(data.proprietario);

        imovel.endereco=data.endereco;
        imovel.cep=data.cep;
        imovel.valor_aluguel=data.valor_aluguel;
        imovel.valor_iptu=data.valor_iptu;
        imovel.proprietario=data.proprietario;

        let save = await imovel.save();
        if(!save) throw "erro ao editar";
        return save;
    },
    excluirImovel: async (query) => {
        let imovel = await ImoveisSchema.findById(query.id);
        if(!imovel) throw "imovel não encontrado";

        let contrato= await ContratosSchema.findOne({imovel:imovel._id})
        if(contrato) throw "existe um contrato vinculado a esse imóvel";

        let exclude = await imovel.remove();
        if(!exclude) throw "não foi possivel deletar esse imóvel";

        return imovel;
    },

    buscaImovel: async (query) =>{
        let imovel=await ImoveisSchema.findById(query.id).populate('proprietario').lean();
        if(!imovel) throw "erro ao consultar"
        let contrato= await ContratosSchema.findOne({imovel:imovel._id})
        if(contrato) imovel.notExclude=true;
        return imovel;
    },

    buscaImoveis : async function(query){

        let queryParse={};

        if(query.referencia) queryParse.referencia = query.referencia;
        if(query.endereco) queryParse.endereco = {$regex:query.endereco, $options:'gi'};
        if(query.cep) queryParse.cep = query.cep;
        if(query.valor_aluguel) queryParse.valor_aluguel = query.valor_aluguel;
        if(query.valor_iptu) queryParse.valor_iptu = query.valor_iptu;
        if(query.proprietario) queryParse.proprietario = query.proprietario;

        const imoveis = await ImoveisSchema.find(queryParse).limit(10).populate('proprietario');

        if(!imoveis) throw "erro ao inserir";

        return imoveis;

    }

}

module.exports=ImoveisServices;
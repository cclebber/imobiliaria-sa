const PessoasSchema = require("../model/pessoas");
const ContratosSchema = require("../model/contratos");
const ImoveisSchema = require("../model/imoveis");
const ObjectId = require('mongoose').Types.ObjectId;

const PessoasServices = {

    inserePessoa : async function(data){

        const newPessoa= new PessoasSchema({
            nome:data.nome,
            cpf:data.cpf,
            data_nascimento:data.data_nascimento,
            endereco:data.endereco,
            pix:data.pix,
            contato:data.contato,
        })

        const insert = await newPessoa.save();

        if(!insert) throw "erro ao inserir";

        return insert;
    },

    editarPessoa: async (data) =>{
        let pessoa = await PessoasSchema.findById(data.id);
        if(!pessoa) throw "erro ao encontrar a pessoa";

        pessoa.nome=data.nome;
        pessoa.cpf=data.cpf;
        pessoa.data_nascimento=data.data_nascimento;
        pessoa.endereco=data.endereco;
        pessoa.pix=data.pix;
        pessoa.contato=data.contato;
        let save = await pessoa.save();
        if(!save) throw "erro ao editar";
        return save;
    },

    excluirPessoa: async (query) => {
        let pessoa = await PessoasSchema.findById(query.id);
        if(!pessoa) throw "erro ao encontrar a pessoa";

        let imovel = await ImoveisSchema.findOne({proprietario:pessoa._id})
        if(imovel) throw "a pessoa possui um vinculo de imóvel";

        let contrato = await ContratosSchema.findOne({inquilino:pessoa._id})
        if(contrato) throw "a pessoa possui um vinculo de contrato";

        let excluir = pessoa.remove();
        if(!excluir) throw "erro ao excluir";
        return excluir;
    },

    buscaPessoa: async (query) =>{
        let pessoa = await PessoasSchema.findById(query.id).lean()
        if(!pessoa) throw "erro ao consultar"

        let imovel = await ImoveisSchema.findOne({proprietario:pessoa._id})
        if(imovel) pessoa.notExclude=true;

        let contrato = await ContratosSchema.findOne({inquilino:pessoa._id})
        if(contrato) pessoa.notExclude=true;

        return pessoa;
    },

    buscaPessoas : async function(query){

        let queryParse={};

        if(query.nome) queryParse.nome = {$regex: query.nome, $options: 'gi'};
        if(query.cpf) queryParse.nome = query.cpf;
        if(query.data_nascimento) queryParse.nome = query.data_nascimento;
        if(query.endereco) queryParse.nome = query.endereco;
        if(query.pix) queryParse.nome = query.pix;
        if(query.contato) queryParse.nome = query.contato;

        const pessoas = await PessoasSchema.find(queryParse).limit(10);

        if(!pessoas) throw "erro ao inserir";

        return pessoas;

    }
}

module.exports=PessoasServices;
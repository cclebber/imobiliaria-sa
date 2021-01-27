const PessoasSchema = require("../model/pessoas");

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

    buscaPessoas : async function(query){

        let queryParse={};

        if(query.nome) queryParse.nome = query.nome;
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
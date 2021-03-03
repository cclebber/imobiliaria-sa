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
        console.info(query);
        let pessoa = await PessoasSchema.deleteOne({_id:ObjectId(query.id)})
        console.info(pessoa);
        if(!pessoa) throw "erro ao excluir";
        return pessoa;
    },

    buscaPessoa: async (query) =>{
        if(!pessoa) throw "erro ao consultar"
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
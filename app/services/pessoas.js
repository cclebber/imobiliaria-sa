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

        const insert = newPessoa.save();

        if(!insert) throw "erro ao inserir";

        return insert;
    }
}

module.exports=PessoasServices;
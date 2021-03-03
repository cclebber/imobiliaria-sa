const PessoasServices = require("../services/pessoas");

const Pessoas = {

    inserePessoa: async function(req, res){
        try {
            await PessoasServices.inserePessoa(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    buscaPessoa: async (req, res) => {
        try {
            res.json(await PessoasServices.buscaPessoa(req.params));
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    editarPessoa: async (req, res) => {
        try {
            PessoasServices.editarPessoa(req.body);
            res.json({ok:true, message:'Editado com sucesso'});
        } catch (error) {
            console.info(error);
            res.json({ok:false, message:error});
        }
    },
    excluirPessoa: async (req, res) => {
        try {
            let pessoa = await PessoasServices.excluirPessoa(req.params);
            res.json(pessoa);
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    buscaPessoas: async function(req, res){

        try {
            let pessoas = await PessoasServices.buscaPessoas(req.query);
            res.json({pessoas:pessoas});
        } catch (error) {
            res.json({ok:false, message:error});
        }

    }
}

module.exports= Pessoas;
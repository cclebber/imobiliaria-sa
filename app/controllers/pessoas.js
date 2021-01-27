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
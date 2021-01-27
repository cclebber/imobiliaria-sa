const ImoveisServices = require("../services/imoveis");

const Imoveis = {

    insereImovel: async function(req, res){        
        try {
            ImoveisServices.insereImovel(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },

    buscaImoveis: async function(req, res){

        try {
            let imoveis = await ImoveisServices.buscaImoveis(req.query);
            res.json({imoveis:imoveis});
        } catch (error) {
            res.json({ok:false, message:error});
        }

    }

}

module.exports= Imoveis;
const ContratosServices = require("../services/contratos");

const Contratos = {

    insereContrato: function(req, res){        
        try {
            ContratosServices.insereContrato(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            console.info(error);
            res.json({ok:false, message:error});
        }
    },

    buscaContratos: async function(req, res){
        try {
            let contratos = await ContratosServices.buscaContratos(req.query);
            res.json({contratos:contratos});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    }

}

module.exports= Contratos;
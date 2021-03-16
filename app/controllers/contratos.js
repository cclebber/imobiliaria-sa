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
    buscaContrato: async (req, res) => {
        try {
            res.json(await ContratosServices.buscaContrato(req.params));
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    editarContrato: async (req, res) => {
        try {
            ContratosServices.editarContrato(req.body);
            res.json({ok:true, message:'Editado com sucesso'});
        } catch (error) {
            console.info(error);
            res.json({ok:false, message:error});
        }
    },
    excluirContrato: async (req, res) => {
        try {
            let contrato = await ContratosServices.excluirContrato(req.params);
            res.json(contrato);
        } catch (error) {
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
    },
    imprimirContrato: async (req, res) => {
        try {
            res.end(await ContratosServices.imprimirContrato(req.params));
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },

}

module.exports= Contratos;
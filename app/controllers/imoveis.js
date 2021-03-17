const ImoveisServices = require("../services/imoveis");

const Imoveis = {

    insereImovel: async function(req, res){        
        try {
            await ImoveisServices.insereImovel(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },

    buscaImovel: async (req, res) => {
        try {
            res.json(await ImoveisServices.buscaImovel(req.params));
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    editarImovel: async (req, res) => {
        try {
            await ImoveisServices.editarImovel(req.body);
            res.json({ok:true, message:'Editado com sucesso'});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    excluirImovel: async (req, res) => {
        try {
            let imovel = await ImoveisServices.excluirImovel(req.params);
            res.json(imovel);
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
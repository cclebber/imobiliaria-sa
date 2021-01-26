const ImoveisServices = require("../services/imoveis");

const Imoveis = {

    insereImovel: function(req, res){        
        try {
            ImoveisServices.insereImovel(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    }

}

module.exports= Imoveis;
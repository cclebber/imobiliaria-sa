const PessoasServices = require("../services/pessoas");

const Pessoas = {

    inserePessoa: function(req, res){        
        try {
            PessoasServices.inserePessoa(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    }

}

module.exports= Pessoas;
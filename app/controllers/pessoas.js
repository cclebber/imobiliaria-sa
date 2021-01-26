const PessoasSchema = require("../model/pessoas");

const Pessoas = {

    inserePessoa: function(req, res){
        
        console.info("teste", req.body.nome);

        const newPessoa= new PessoasSchema({
            "nome":req.body.nome,
            "cpf":req.body.cpf,
            "data_nascimento":req.body.data_nascimento,
            "endereco":req.body.endereco,
            "pix":req.body.pix,
            "contato":req.body.contato,
        })

        newPessoa.save(function(err, resNew){

            if(err) res.json({ok:false});
            
            res.json({ok:true});
        })


    }

}

module.exports= Pessoas;
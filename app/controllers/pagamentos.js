const PagamentosServices = require("../services/pagamentos");

const Pagamentos = {

    inserePagamento: async function(req, res){        
        try {
            await PagamentosServices.inserePagamento(req.body);
            res.json({ok:true, message:'Incluido com sucesso'});
        } catch (error) {
            console.info(error);
            res.json({ok:false, message:error});
        }
    },
    buscaPagamento: async (req, res) => {
        try {
            res.json(await PagamentosServices.buscaPagamento(req.params));
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },
    editarPagamento: async (req, res) => {
        try {
            await PagamentosServices.editarPagamento(req.body);
            res.json({ok:true, message:'Editado com sucesso'});
        } catch (error) {
            console.info(error);
            res.json({ok:false, message:error});
        }
    },
    excluirPagamento: async (req, res) => {
        try {
            let pagamento = await PagamentosServices.excluirPagamento(req.params);
            res.json(pagamento);
        } catch (error) {
            res.json({ok:false, message:error});
        }

    },
    buscaPagamentos: async function(req, res){
        try {
            let pagamentos = await PagamentosServices.buscaPagamentos(req.query);
            res.json({pagamentos:pagamentos});
        } catch (error) {
            res.json({ok:false, message:error});
        }
    },

}

module.exports= Pagamentos;

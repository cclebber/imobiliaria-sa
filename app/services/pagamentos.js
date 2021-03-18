const PagamentosSchema = require("../model/pagamentos");
const ContratosSchema = require("../model/contratos");
const ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment');

const PagamentosServices = {

    inserePagamento : async (data) => {
        if(data.data_recebimento) data.data_recebimento=new Date(data.data_recebimento);
        if(data.valor_recebido) data.valor_recebido=data.valor_recebido*1;
        if(data.ano_referencia) data.ano_referencia=data.ano_referencia*1;
        if(data.contrato) data.contrato=ObjectId(data.contrato);
        

        const newPagamento= new PagamentosSchema({
            data_recebimento:data.data_recebimento,
            valor_recebido:data.valor_recebido,
            mes_referencia:data.mes_referencia,
            ano_referencia:data.ano_referencia,
            contrato:data.contrato,

        })

        const insert = await newPagamento.save();

        if(!insert) throw "erro ao inserir";

        return insert;
    },

    editarPagamento: async (data) =>{
        let pagamento = await PagamentosSchema.findById(data.id);
        if(!pagamento) throw "erro ao encontrar o pagamento";

        if(data.data_recebimento) data.data_recebimento=new Date(data.data_recebimento);
        if(data.valor_recebido) data.valor_recebido=data.valor_recebido*1;
        if(data.ano_referencia) data.ano_referencia=data.ano_referencia*1;
        if(data.contrato) data.contrato=ObjectId(data.contrato);

        pagamento.data_recebimento=data.data_recebimento;
        pagamento.valor_recebido=data.valor_recebido;
        pagamento.mes_referencia=data.mes_referencia;
        pagamento.ano_referencia=data.ano_referencia;
        pagamento.contrato=data.contrato;
        
        let save = await pagamento.save();
        if(!save) throw "erro ao editar";
        return save;
    },
    excluirPagamento: async (query) => {
        console.info(query);
        let pagamento = await PagamentosSchema.deleteOne({_id:ObjectId(query.id)})
        console.info(pagamento);
        if(!pagamento) throw "erro ao excluir";
        return pagamento;
    },

    buscaPagamento: async (query) =>{
        let pagamento=await PagamentoSchema.findById(query.id).populate('contrato');
        if(!pagamento) throw "erro ao consultar"
        return pagamento;
    },

    buscaPagamentos : async function(query){

        let queryParse={};

    
        if(query.pagamento) queryParse.contrato = query.contrato;

        const pagamentos = await PagamentosSchema.find(queryParse);

        if(!pagamentos) throw "erro ao consultar";

        return pagamentos;
    },

}

module.exports=PagamentosServices;
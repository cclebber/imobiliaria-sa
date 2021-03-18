const {Schema, model} = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const PagamentosSchema = new Schema({
    data_recebimento: {
        type:Date,
        required:[true, 'Data de pagamento é um campo obrigatrório!']
    },
    valor_recebido: {
        type:Number,
        required:[true, 'Valor recebido é um campo obrigatrório!']
    },
    
    mes_referencia: {
        type:String,
        required:[true, 'Mes de referência é um campo obrigatrório!']
    },

    ano_referencia: {
        type:Number,
        required:[true, 'Ano de referência é um campo obrigatrório!']
    },
    contrato: {
        type:ObjectId,
        ref:'contratos',
        required:[true, 'Contrato é um campo obrigatrório!']
    },
})

module.exports = model("pagamentos", PagamentosSchema);
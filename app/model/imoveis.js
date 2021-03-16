const {Schema, model} = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const ImoveisSchema = new Schema({
    referencia:{
        type:String,
        unique: true,
        required:[true, 'Referencia é um campo obrigatrório!']
    },
    endereco: {
        type:String,
        required:[true, 'Endereço é um campo obrigatrório!']
    },
    cep: {
        type:Number,
        required:[true, 'CEP é um campo obrigatrório!'],
        validate: {
            validator: function(v) {
              return /\d{8}/.test(v);
            },
            message: props => `${props.value} não é um CEP válido!`
        },
    },
    valor_aluguel: {
        type:Number,
        required:[true, 'Valor do aluguel é um campo obrigatrório!']
    },
    valor_iptu: {
        type:Number,
        required:[true, 'Valor do IPTU é um campo obrigatrório!']
    },
    proprietario: {
        type: ObjectId,
        ref:'pessoas',
        required:[true, 'Proprietário é um campo obrigatrório!']
    }
})

module.exports = model("imoveis", ImoveisSchema);
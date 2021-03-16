const {Schema, model} = require('mongoose');
const {validateCPF} = require("../utils");

const PessoasSchema = new Schema({
    nome: {
        type:String,
        required:[true, 'Nome é um campo obrigatrório!']
    },
    cpf: {
        type:String,
        required:[true, 'CPF é um campo obrigatrório!'],
        validate: {
            validator: validateCPF,
            message: props => `${props.value} CPF não é valido!`
          }
    },
    data_nascimento: {
        type:Date,
        required:[true, 'Data de nascimento é um campo obrigatrório!']
    },
    endereco: {
        type:String,
        required:[true, 'Endereço é um campo obrigatrório!']
    },
    pix:{
        type:String,
        required:true
    },
    contato:{
        type:Number,
        required:[true, 'Telefone é um campo obrigatrório!'],
        validate: {
            validator: function(v) {
              return /\d{11}/.test(v);
            },
            message: props => `${props.value} não é um telefone válido!`
          },
    },
})

module.exports = model("pessoas", PessoasSchema);
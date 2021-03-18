const router = require("express").Router(); 
const pagamentos = require('../controllers/pagamentos.js');

router.get('/pagamentos/:id', pagamentos.buscaPagamento);
router.delete('/pagamentos/:id', pagamentos.excluirPagamento);
router.get('/pagamentos', pagamentos.buscaPagamentos);
router.post('/pagamentos', pagamentos.inserePagamento);
router.put('/pagamentos', pagamentos.editarPagamento);

module.exports=router;
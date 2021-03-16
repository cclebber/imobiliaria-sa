const router = require("express").Router(); 
const contratos = require('../controllers/contratos.js');

router.get('/contratos/:id', contratos.buscaContrato);
router.get('/contratos/imprimir/:id', contratos.imprimirContrato);
router.delete('/contratos/:id', contratos.excluirContrato);
router.get('/contratos', contratos.buscaContratos);
router.post('/contratos', contratos.insereContrato);
router.put('/contratos', contratos.editarContrato);

module.exports=router;
const router = require("express").Router(); 
const imoveis = require('../controllers/imoveis.js');

router.get('/imoveis/:id', imoveis.buscaImovel);
router.delete('/imoveis/:id', imoveis.excluirImovel);
router.get('/imoveis', imoveis.buscaImoveis);
router.post('/imoveis', imoveis.insereImovel);
router.put('/imoveis', imoveis.editarImovel);

module.exports=router;
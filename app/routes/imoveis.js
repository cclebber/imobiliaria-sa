const router = require("express").Router(); 
const imoveis = require('../controllers/imoveis.js');

router.get('/imoveis', imoveis.buscaImoveis);
router.post('/imoveis', imoveis.insereImovel);

module.exports=router;
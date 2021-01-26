const router = require("express").Router(); 
const imoveis = require('../controllers/imoveis.js');

router.post('/imoveis', imoveis.insereImovel);

module.exports=router;
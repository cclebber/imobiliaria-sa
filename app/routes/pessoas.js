const router = require("express").Router(); 
const pessoas = require('../controllers/pessoas.js');

router.post('/pessoas', pessoas.inserePessoa);

module.exports=router;
const router = require("express").Router(); 
const pessoas = require('../controllers/pessoas.js');

router.get('/pessoas', pessoas.buscaPessoas);
router.post('/pessoas', pessoas.inserePessoa);

module.exports=router;
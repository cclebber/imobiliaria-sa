const router = require("express").Router(); 
const pessoas = require('../controllers/pessoas.js');

router.get('/pessoas/:id', pessoas.buscaPessoa);
router.post('/pessoas', pessoas.inserePessoa);
router.get('/pessoas', pessoas.buscaPessoas);
router.delete('/pessoas/:id', pessoas.excluirPessoa);
router.put('/pessoas', pessoas.editarPessoa);

module.exports=router;
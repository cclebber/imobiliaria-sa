const router = require("express").Router(); 
const contratos = require('../controllers/contratos.js');

router.post('/contratos', contratos.insereContrato);

module.exports=router;
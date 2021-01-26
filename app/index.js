const express = require('express')
const app = express()
const mongoose = require('mongoose');
const pessoas = require('./controllers/pessoas.js')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
//rotas
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/pessoas', pessoas.inserePessoa);


mongoose.connect('mongodb://localhost/imobiliaria', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    app.listen(3000)
});
 
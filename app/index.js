const express = require('express')
const app = express()
const mongoose = require('mongoose');
const routes = require('./routes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
//rotas
app.get('/', function (req, res) {
    res.send('Bem Vindo a Imobiliária Sá')
})

app.use(routes);


mongoose.connect('mongodb://localhost:27017/imobiliaria', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    app.listen(3000)
});
 
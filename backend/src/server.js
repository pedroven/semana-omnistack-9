const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://pedro:adminomni@cluster0-blwqc.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//
// req.query = Acessar query params(para filtros)
// req.params = Acessar route params(para edição e delete)
// req.body = Acesar corpo da requisição(para criação, edição)

app.use(express.json());
app.use(routes);

app.listen(8888, console.log("Running on port 8888"));
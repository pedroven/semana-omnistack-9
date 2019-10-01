const express = require('express');
const app = express();

// app.get('/', (req, res) => {
//     return res.json({
//         message: "has nothing here yet, keep calm"
//     })
// });

// req.query = Acessar query params(para filtros)
// req.params = Acessar route params(para edição e delete)
// req.body = Acesar corpo da requisição(para criação, edição)

app.use(express.json());

app.post('/users', (req, res) => {
     return res.json(req.body);
});

app.listen(8888, console.log("Running on port 8888"));
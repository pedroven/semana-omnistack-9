const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');

mongoose
	.connect(
		'mongodb+srv://Pedro:admin@cluster0-k4roi.mongodb.net/aircnc?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.error('Database connection failed, err:', err);
	});
//
// req.query = Acessar query params(para filtros)
// req.params = Acessar route params(para edição e delete)
// req.body = Acesar corpo da requisição(para criação, edição)
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(8888, console.log('Running on port 8888'));

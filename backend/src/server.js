const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

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

const connectedUsers = {}; //subtituir por redis ou algo do tipo

io.on('connection', (socket) => {
	const { user_id } = socket.handshake.query;

	connectedUsers[user_id] = socket.id; //relacionando um usuario a um socket de conexao
	// setTimeout(() => {
	// 	socket.emit('surprise', 'modafoca');
	// }, 5000); falar
	//ouvir
	// socket.on('brodi', (data) => {
	// 	console.log(data);
	// });
});

app.use((req, res, next) => {
	req.io = io; //adicionando protocolo websocket as requisiçoes
	req.connectedUsers = connectedUsers;

	return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(8888, console.log('Running on port 8888'));

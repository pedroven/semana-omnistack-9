const express = require('express');
const routes = express.Router();
const SessionController = require('./controllers/SessionController');

routes.get('/users', );

routes.post('/users', SessionController.store);

routes.put('/users/:id', (req, res) => {

});

routes.delete('/users/:id', (req, res) => {

});

module.exports = routes;
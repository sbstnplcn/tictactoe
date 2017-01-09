'use strict'

let UsersController = require('../controllers/UsersController')

module.exports = (app, io) => {

    let ctrl = new UsersController()

    var numClients = 0;

    io.on('connection', (socket) => {
        ctrl._onConnection(socket)
    });

    io.on('play', (socket) => {
        console.log('play');
    });

    let nsp = io.of('/tictactoe');

    nsp.on('connection', (socket) => {

        ctrl._onSpace(socket)
        numClients++;
        nsp.emit('stats', {
            numClients: numClients
        });

        console.log('user Connected');


        socket.on('disconnect', function() {
            numClients--;
            nsp.emit('stats', {
                numClients: numClients
            });
            console.log(numClients)
            nsp.emit('disconnect', {
                id: socket.id
            });
        });

    })

    app.get('/users', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/users/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/users', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/users/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/users/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })
}

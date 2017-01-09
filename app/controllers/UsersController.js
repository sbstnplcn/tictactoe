'use strict';
let Controller = require('./Controller')
let jwt = require('jsonwebtoken')
const ENV = require('../../config/env')
const USER = require('../models/user')

class UsersController extends Controller {

    constructor(io) {
        super(USER)
        this.io = io
        var numClients = 0;
        this.io.on('connection', (socket) => {
            this._onConnection(socket)
        });
        let nsp = io.of('/tictactoe');
        nsp.on('connection', (socket) => {
            this._onSpace(socket)
            numClients++;
            nsp.emit('stats', {
                numClients: numClients
            });

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
    }

    _onSpace(socket) {
        console.log('user Connected');
        socket.on('disconnect', () => {
            console.log("Disconnected")
            socket.disconnect(true)
        })
    }
    _onConnection(socket) {
        console.log('Connection');
    }

    findById(req, res, next) {
        this.model.findById(req.params.id).exec((err, document) => {
            if (err) next(err)
            else res.json(document)
        })
    }

    authenticate(req, res, next) {
        if (req.user) {
            let token = jwt.sign(req.user, ENV.token, {
                expiresIn: "24h"
            })
            res.redirect("/auth/callback/" + token);
        } else {
            res.send(401);
        }
    }

}

module.exports = UsersController

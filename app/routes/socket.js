'use strict'

let SocketController = require('../controllers/SocketController')

module.exports = (app, io) => {

    let ctrl = new SocketController(io)

    let usersInfos = []
    let tic = [
        [{
            value: ""
        }, {
            value: ""
        }, {
            value: ""
        }],
        [{
            value: ""
        }, {
            value: ""
        }, {
            value: ""
        }],
        [{
            value: ""
        }, {
            value: ""
        }, {
            value: ""
        }]
    ]

    let nsp = io.of('/tictactoe');

    nsp.on('connection', (socket) => {

        socket.on('userInfos', (userInfo) => {
            userInfo.socketId = io.id
            usersInfos.push(userInfo)
            nsp.emit('allUsers', (usersInfos))
        })

        socket.on('play', (socket) => {
            nsp.emit('playValue', socket)
        });
    })

    nsp.on('disconnect', function() {
        nsp.emit('disconnect', {
            id: socket.id
        })
    })


}

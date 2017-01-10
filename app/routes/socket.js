'use strict'

let SocketController = require('../controllers/SocketController')

module.exports = (app, io) => {

    let ctrl = new SocketController(io)

    let usersInfos = []
    let nsp = io.of('/tictactoe');

    nsp.on('connection', (socket) => {

        socket.on('userInfos', (userInfo) => {
            userInfo.socketId = io.id
            usersInfos.push(userInfo)
            nsp.emit('allUsers', (usersInfos))
        })

        socket.on('play', (socket) => {
            nsp.emit('playValue', (socket))
            console.log('play')
        });
    })

    nsp.on('disconnect', function() {
        nsp.emit('disconnect', {
            id: socket.id
        })
    })


}

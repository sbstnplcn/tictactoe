'use strict'

let SocketController = require('../controllers/SocketController')

module.exports = (app, io) => {

    let ctrl = new SocketController(io)
    let usersInfos = []

    io.on('connection', (socket) => {
        socket.on('userInfos', (userInfo) => {
            userInfo.socketId = io.id
            usersInfos.push(userInfo)
            io.emit('allUsers', (usersInfos))
        })

        socket.on('play', (socket) => {
            io.emit('playValue', socket)
        });
    })

    io.on('disconnect', function() {
        io.emit('disconnect', {
            id: socket.id
        })
    })
}

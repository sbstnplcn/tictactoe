'use strict'
let mongoose = require('mongoose')

// Create du schéma User
let userModel = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
}))

module.exports = userModel

'use strict';
let Controller = require('./Controller')
let jwt = require('jsonwebtoken')
const ENV = require('../../config/env')
const USER = require('../models/user')

class SocketController extends Controller {

    constructor(io) {
        super(USER)
    }
}

module.exports = SocketController

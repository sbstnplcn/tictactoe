'use strict';
let Controller = require('./Controller')
let jwt = require('jsonwebtoken')
const ENV = require('../../config/env')
const USER = require('../models/user')
const INFO = require('../models/info')

class UsersController extends Controller {

    constructor() {
        super(USER)
    }

    findById(req,res, next){
      this.model.findById(req.params.id).populate({
        path: 'infos',
        populate:({path: 'users', populate:{ path: 'infos'}})
        }).exec((err, document)=>{
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

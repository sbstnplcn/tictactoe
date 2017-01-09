'use strict'
let Authentification = require('../middlewares/authentification')
let UsersController = require('../controllers/UsersController')

module.exports = (app) => {

    let ctrl = new UsersController()

    app.post('/auth', Authentification.local)

}

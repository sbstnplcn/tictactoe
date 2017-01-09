((app) => {
    'use strict'
})(require('angular').module('app', [
    require('angular-ui-router'),
    require('angular-cookies'),

    'app.config',
    'app.services',
    'app.login',
    'app.game'
]))

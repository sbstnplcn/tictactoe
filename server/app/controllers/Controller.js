'use strict'

class Controller {

    constructor(model) {
        this.model = model
    }
    find(req, res, next) {
        // Récupération de tous les users en fonction du queries strings
        this.model.find(req.query, (err, documents) => {
            res.json(documents)
        })
    }
    findById(req, res, next) {
        // Récupération d'un user en fonction de l'id passé en paramètre
        this.model.findById(req.params.id, (err, document) => {
            if (err)
                next(err)
            else
                res.json(document)
        })
    }
    create(req, res, next) {
        // Création d'un User depuis les données contenu dans le corps de la requete (request body)
        this.model.create(req.body, (err, document) => {
            if (err) {
                next(err)
            } else {
                res.json(document)
            }
        })
    }
    update(req, res, next) {
        // Mise à jour du User d'id passé en paramètre depuis les données contenu dans le corps de la requete (request body)
        this.model.update({
            _id: req.params.id
        }, req.body, (err, document) => {
            if (err) {
                next(err)
            } else {
                res.sendStatus(200)
            }
        })
    }
    delete(req, res, next) {
        // Suppression du User d'id passé en paramètre
        this.model.findByIdAndRemove(req.params.id, (err) => {
            res.sendStatus(200)
        })
    }
}
module.exports = Controller

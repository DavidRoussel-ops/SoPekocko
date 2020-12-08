const Sauce = require('../models/thing');
const Sauces = require('../models/sauce');
const fs = require('fs');


exports.createSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauces({
        ...sauceObject,
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Objet enregistré'}))
        .catch(error => res.status(400).json({error: error}));
};

exports.saucesIdLike = (req, res, next) => {
    const sauce = new Sauces({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({message: "J'aime"}))
        .catch(error => res.status(400).json({error}));
};

exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then((sauces) => {res.status(200).json(sauces)})
        .catch((error) => {res.status(400).json({ error: error })});
};

exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({_id: req.params.id })
        .then((sauce) => {res.status(200).json(sauce)})
        .catch((error) => {res.status(404).json({ error: error })});
};

exports.updateSauces = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageURL.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};



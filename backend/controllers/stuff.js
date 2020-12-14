const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Objet enregistré'}))
        .catch(error => res.status(400).json({error: error}));
};

exports.saucesIdLike = (req, res, next) => {
    console.log("Nombre de like", req.params.likes);
    const userId = req.body.userId;
    const sauceId = req.body.id;
    const isLike = req.params.likes;
    Sauce.findOne({_id: sauceId })
        .then((sauce) => {
            if (isLike === 1) {
                console.log("ajoiut d'un like")
                sauce.usersLiked.append(userId);
            }
            if (isLike === 0){
                console.log("on enleve le like")
                sauce.usersLiked.delete(userId);
            }
            Sauce.updateOne({ _id: sauceId}, {...sauce})
                .then(() => res.status(200).json({ message: (sauce.usersLiked)}))
                .catch(error => res.status(400).json({ error: error }));
        })
        .catch((error) => {res.status(404).json({ error: error })});
    };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {res.status(200).json(sauces)})
        .catch((error) => {res.status(400).json({ error: error })});
};

exports.getOneSauces = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
        .then((sauce) => {res.status(200).json(sauce)})
        .catch((error) => {res.status(404).json({ error: error })});
};

exports.updateSauces = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};



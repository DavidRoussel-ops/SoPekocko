const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject.id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({Sauce}))
        .catch(error => res.status(400).json({error: error}));
};

exports.saucesIdLike = (req, res, next) => {
    const userId = req.body.userId;
    console.log("l'utilisateur est ", userId)
    const sauceId = req.params.id;
    console.log("L'identifiant de la sauce est le ", sauceId);
    const likeSauce = req.body.like;
    console.log("La sauce à " + likeSauce + " like !");
    const userLike = req.params.usersLiked;
    console.log("Le tableau des likes contient ", userLike);
    Sauce.findOneAndUpdate({ _id : userId, like : likeSauce})
    if (userId === true && likeSauce === 1){
        userLike.push({userId : userId, likes : likeSauce});
    }
    Sauce.usersLiked
        .then(() => res.status(200).json({ message : "Like !"}))
        .catch(error => res.status(400).json({ error }))




    /*if (likeSauce === 0 && typeof likeSauce === "number") {
        Sauce.findOne({_id: sauceId})
            .then((sauce) => {
                let likeValue = 0;
                let pullType = "";
                let message = "toto";
                if (sauce.usersLiked.includes(userId)) {
                    likeValue = -1;
                    pullType = "usersLiked";
                    message = "like retirer"
                }
                else if (sauce.usersLiked.includes(userId)) {
                    likeValue = 1;
                    pullType = "usersDisliked";
                    message = "Dislike retirer"
                }
                    Sauce.updateOne(
                        {
                            _id: sauceId,
                        },
                        {
                            $pull: { pullType : userId},
                            $inc: {likes: likeValue},
                        }
                    )
                        .then(() => res.status(200).json({message: "Like supprimer ! "}))
                        .catch((error) => res.status(400).json({error}))
            })
            .catch(error => res.status(400).json({error}));
    }*/
};
    /*
    const sauceIsLiked = req.body.usersLiked;
    console.log("Voici ce qu'il y a dans le tableau like", sauceIsLiked);*/

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



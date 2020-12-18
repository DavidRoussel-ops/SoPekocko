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
    /*const userLike = req.body.userId;
    console.log("L'utilisateur qui veut liké est ", userLike);
    const isLike = req.body.like;
    console.log('Nombre de like ', isLike);

    delete userLike._id;
    const likeIt = new Sauce({
        userId: userLike,
        like: isLike
    });
    likeIt.save()
        .then(() => res.status(201).json({message: likeIt}))
        .catch(error => res.status(400).json({error: error}));*/
    const userId = req.body.userId;
    console.log("l'utilisateur est ", userId)
    const isLike = req.body.like;
    console.log("Le nombre de like est de ", isLike);
    const sauceId = req.params.id;
    console.log("L'identifiant de la sauce est le ", sauceId);
    const sauceIsLiked = req.body.usersLiked;
    console.log("Voici ce qu'il y a dans le tableau like", sauceIsLiked);
    /*Sauce.findOne({
        userId: userId,
        like: isLike
    })
        .then((sauce) => {
            if (isLike === 1) {
                console.log("ajout d'un like")
                sauce.usersLiked.append(userId);
            }
            if (isLike === 0){
                console.log("on enleve le like")
                sauce.usersLiked.remove(userId);
            }
            Sauce.save({ userId: userId}, {...sauce})
                .then(() => res.status(200).json({ message: (sauce.usersLiked)}))
                .catch(error => res.status(400).json({ error: error }));
        })
        .catch((error) => {res.status(404).json({ error: error })});*/

    Sauce.findOne({
        sauceId : sauceId,
        like : isLike
    })
        .then((sauce) =>{
            if (userId === true && isLike === 1){
                sauceIsLiked.append(userId)
            }
            Sauce.save({ sauceIsLiked }, {...sauce})
                .then(() => res.status(200).json({ message : (sauce.usersLiked)}))
                .catch(error => res.status(400).json({ error : error}));
        })
    /*if (isLike === 1){
        req.body.usersLiked.append(userId)
    }
    if (isLike === 0){
        req.body.usersLiked.delete(userId)
    }
    Sauce.save(res.params.usersLiked[userId])
        .then(() => res.status(200).json({usersLiked: userId}))
        .catch(error => res.status(400).json({ error: error}));*/
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



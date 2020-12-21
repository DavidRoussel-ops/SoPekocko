const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    userId: { type: String, required: true },
    likes: 0 ,
    dislikes: 0 ,
    usersLiked: [
        { userId : String, likes : Number}
    ],
    usersDisliked: [
        { userId : String, dislikes : Number}
    ]
});

module.exports = mongoose.model('Sauce', sauceSchema);

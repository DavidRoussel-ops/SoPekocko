const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: String,
    manufacturer: String,
    description: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    imageUrl: String,
    mainPepper: String,
    usersLiked: [],
    usersDisliked: [],
    userId: String
});

module.exports = mongoose.model('Sauce', sauceSchema);

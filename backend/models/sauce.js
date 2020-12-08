const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    _id: mongoose.ObjectId,
    name: String,
    manufacturer: String,
    description: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    imageUrl: String,
    mainPepper: String,
    usersLiked: [Number],
    usersDisliked: [Number],
    userId: String
});

module.exports = mongoose.model('Sauce', sauceSchema);

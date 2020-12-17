const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    id: String,
    userId: String,
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: Number,
    dislikes: Number,
    imageUrl: {type: String, required: true},
    mainPepper: {type: String, required: true},
    usersLiked: [],
    usersDisliked: []
});

module.exports = mongoose.model('Sauce', sauceSchema);

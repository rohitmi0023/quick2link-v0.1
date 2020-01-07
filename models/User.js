const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    socialList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Social"
        }
    ],
    moviesList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movies"
        }
    ],
    sportsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sports"
        }
    ],
    musicList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Music"
        }
    ],
    othersList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Others"
        }
    ]
});

module.exports = User = mongoose.model("User", UserSchema);

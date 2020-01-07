const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    lists: [
        {
            link: { type: String },
            linkName: { type: String }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = Music = mongoose.model("Music", musicSchema);

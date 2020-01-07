const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
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

module.exports = Movies = mongoose.model("Movies", moviesSchema);

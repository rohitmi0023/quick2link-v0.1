const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sportsSchema = new Schema({
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

module.exports = Sports = mongoose.model("Sports", sportsSchema);

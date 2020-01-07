const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const othersSchema = new Schema({
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

module.exports = Others = mongoose.model("Others", othersSchema);

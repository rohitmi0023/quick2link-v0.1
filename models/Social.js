const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema({
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

module.exports = Social = mongoose.model("Social", socialSchema);

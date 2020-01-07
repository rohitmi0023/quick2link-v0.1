const mongoose = require("mongoose");
const config = require("./default.json").mongoURI;

// const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(config, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected...`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

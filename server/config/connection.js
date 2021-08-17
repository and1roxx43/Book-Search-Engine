const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;
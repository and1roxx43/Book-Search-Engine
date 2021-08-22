const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;


// mongodb+srv://and1roxx43:Mar12Nat10240568@cluster0.j5j1s.mongodb.net/googlebooks?retryWrites=true&w=majority
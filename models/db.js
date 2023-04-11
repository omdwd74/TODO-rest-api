// models/db.js
const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/Tododb';

mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((err) => console.error('Failed to connect to database', err));

module.exports = mongoose;

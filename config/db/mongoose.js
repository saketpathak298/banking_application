require('dotenv').config();
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

module.exports={mongoose}
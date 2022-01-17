const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(res => console.log('Connection Successful')).catch(err => console.log(err));


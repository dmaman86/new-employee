'use strict'

require('./config');

const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.URLDB , (err, res) => {

    if ( err ) throw err;
    
    console.log('DB ONLINE');

});

app.listen(process.env.PORT , () => {
    console.log('Listen port: ', process.env.PORT);
});
const express = require('express');
const port=3000;
const app = express();
const expressLayouts= require('express-ejs-layouts');

app.use(express.urlencoded());

const db=require('./config/mongoose');

//use express layouts
app.use(expressLayouts);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./assets'));

//make the uploads path available to browser
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('error in the server',err);
        return;
    }
    console.log('server is running on port', port);
})
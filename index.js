const express = require('express');
const port=3000;
const app = express();

app.use(express.urlencoded());


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('error in the server',err);
        return;
    }
    console.log('server is running on port', port);
})
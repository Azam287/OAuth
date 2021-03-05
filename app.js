const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
require('./config/passport-setup');

//set up view engine
app.set('view engine', 'ejs');

//middleware
app.use('/auth', authRoutes);


app.get('/',(req,res)=>{
    res.render('home');
});

//listening server
app.listen(3000,()=>{console.log('server is listening')});
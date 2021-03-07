const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
require('./config/passport-setup');
const mongoose = require('mongoose');
cookieSession = require('cookie-session');
const passport = require('passport');

//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:process.env.KEYS
}))

//Initialize passport
app.use(passport.initialize())
app.use(passport.session())

//middleware
app.use('/auth', authRoutes);
app.use('/profile',profileRoutes);
app.get('/',(req,res)=>{
    res.render('home');
});

//connecting database
mongoose.connect(process.env.DATABASE_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if (error) console.log(error.message);
    else console.log('database connected');
})

//listening server
app.listen(3000,()=>{console.log('server is listening')});
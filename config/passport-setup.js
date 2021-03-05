const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv/config');

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL:'/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
    },(accessToken, refreshToken, profile, done)=>{
        //passport callback function
        console.log('passport callback finction fired');
        console.log(profile);
    })
    )
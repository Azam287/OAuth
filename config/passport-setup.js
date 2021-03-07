const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv/config');
const User = require('../models/user-model');

//passing information to the user
passport.serializeUser((user,done)=>{
    done(null, user.id)
});

//deserializing the cookie
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL:'/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
    },(accessToken, refreshToken, profile, done)=>{
        //passport callback function
        //console.log('passport callback finction fired');
        //console.log(profile);

        //check if the user exist in the database
        User.findOne({googleID: profile.id}).then((currentUser)=>{
            if(!currentUser){
                //already have the user
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                })
                .save()
                .then((newUser)=>{
                    console.log('new user created', + newUser)
                    done(null, newUser)
                })
            }
            else{
                console.log('user is:', currentUser)
                done(null, currentUser)
            }
        })
    })
)
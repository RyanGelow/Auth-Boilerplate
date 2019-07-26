const passport = requrie('passport');
const User = require('./../models/User');
const config = require('./../config');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport.local');

//Create local strategy

//By default LocalStrategy is expecting a username and a password

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try{
        const user = await User.findOne({ email });
        if(!user) {
            return done(null, false);
        }
        user.comparePassword(password, (err, isMatch) => {
            // If error..
            if(err) return done(err)
            // If no match...
            if(!isMatch) return done(null, false);
            // If all good...
            return done(null, user);
        })
    } catch(e) {
        done(e, false)
    }
})

passport.use(localLogin);
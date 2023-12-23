const passport = require('passport');
const googleStretegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');

// tell passport to use new stretegy for google login

passport.use(new googleStretegy({
        clientID: '976846330095-jnb6mvtvhnq9uhgnop6hn3oi4kq1igql.apps.googleusercontent.com',

        clientSecret: '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',

        callbackURL: 'http://localhost:8000/auth/google/callback',
        passReqToCallback: true,

    },
    async function(request, accessToken, refreseToken, profile, done) {
        // console.log(profile);
        // find user
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            console.log(profile);
            if (user) {
                return done(null, user);
            }
            if (!user) {
                // if not foun
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                if (newUser) {
                    return done(null, newUser);
                }

            }

        } catch (error) {
            console.log('error in google stretegy passport', error);
        }


    }
));
module.exports = passport;
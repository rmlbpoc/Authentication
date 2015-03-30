//load the required modules

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../app/models/user.js');

// load the auth variables
//var configAuth = require('./auth');
var authData = require('./authConfig.json');


// expose this function to our app using module.exports
module.exports = function(passport,app) {
    //var config = new configAuth(app.get('env'));

    /*
     |--------------------------------------------------------------------------
     |                      PASSPORT SESSION SETUP
     |--------------------------------------------------------------------------
     */
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /*
     |--------------------------------------------------------------------------
     |                      LOCAL SIGNUP
     |--------------------------------------------------------------------------
     */

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },function(req,email,password,done){
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function(){
            var usr = req.body;
            console.log('inside passport local signup: ',usr);
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'local.email':usr.email},function(err,user){
                if(err)
                    //console.log(err);
                    return done(err);
                    //res.send("error while signing up user");
                // check to see if theres already a user with that email
                if(user){
                    console.log("email is already taken");
                    return done(null,false,{'message':'That email is already taken'});

                    //return res.send('That email is already taken')
                }else{
                    // if there is no user with that email, create the user
                    console.log("creating new user");
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.firstName = req.body.firstName;
                    newUser.local.lastName = req.body.lastName;
                    newUser.profile = {};

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);

                    });
                }

            });
        });
    }));

    /*
     |--------------------------------------------------------------------------
     |                      LOCAL LOGIN
     |--------------------------------------------------------------------------
     */

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login',new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },function(req,email,password,done){
            var usr = req.body;
            console.log('inside passport local login: ',usr);
            User.findOne({'local.email':usr.email},function(err,user){
                if(err)
                    return done(err);
                if(!user){
                    console.log('no user found');
                    return done(null,false,{message:'No user found'});
                }

                if(!user.validPassword(usr.password))

                    return done(null,false,{message:'Oops! Invalid password'});

                return done(null,user);
            })
        }
    ));

    /*
     |--------------------------------------------------------------------------
     |                      FACEBOOK LOGIN
     |--------------------------------------------------------------------------
     */
    passport.use('facebook',new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : authData.openIdAuth.facebookAuth.clientID,
        clientSecret    : authData.openIdAuth.facebookAuth.clientSecret,
        callbackURL     : authData.openIdAuth.facebookAuth.callbackURL
    },
        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            console.log(profile);
            // asynchronous
            process.nextTick(function() {

               //find the user in hte db based on facebook id
                User.findOne({'facebook.id':profile.id},function(err,user){
                    if(err)
                        return done(err);
                    if(user){
                        return done(null,user) //user found
                    }
                    else{
                        //if there is no user found, create one
                        var newUser = new User();
                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    /*
     |--------------------------------------------------------------------------
     |                      TWITTER LOGIN
     |--------------------------------------------------------------------------
     */
    passport.use(new TwitterStrategy({

            consumerKey     : authData.openIdAuth.twitterAuth.consumerKey,
            consumerSecret  : authData.openIdAuth.twitterAuth.consumerSecret,
            callbackURL     : authData.openIdAuth.twitterAuth.callbackURL

        },
        function(token, tokenSecret, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Twitter
            process.nextTick(function() {
                console.log('processing using twitter strategy');
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err){
                        console.log(err);
                        return done(err);
                    }

                    // if the user is found then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser                 = new User();

                        // set all of the user data that we need
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        // save our user into the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            });

        }
    ));

    /*
     |--------------------------------------------------------------------------
     |                      GOOGLE LOGIN
     |--------------------------------------------------------------------------
     */
    passport.use(new GoogleStrategy({

            clientID        : authData.openIdAuth.googleAuth.clientID,
            clientSecret    : authData.openIdAuth.googleAuth.clientSecret,
            callbackURL     : authData.openIdAuth.googleAuth.callbackURL

        },
        function(token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {

                // try to find the user based on their google id
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));
};
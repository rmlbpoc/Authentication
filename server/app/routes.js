var async = require('async');
var crypto = require('crypto');
// async library to avoid dealing with nested callbacks by using with the help of async.waterfall method
var nodemailer = require('nodemailer');
var User = require('../app/models/user.js');

module.exports = function(app,passport){

    //Handle templates from angular ui-router
    app.get('/partials/:filename', function(req,res){
        var filename = req.params.filename;
        if(!filename) return;  // might want to change this
        res.render("partials/" + filename );
    });

    app.get('/layoutNew',function(req,res){
        res.render('layoutNew.jade');
    });
    app.get('/layoutVis',function(req,res){
        res.render('layoutVis.jade');
    });
    //========================================
    //HOME PAGE (with login links ============
    //========================================
    app.get('/',function(req,res){
        if(req.isAuthenticated()){
            console.log('user is authenticated');
            res.render('indexSubs.jade',{
                user:req.user // get the user out of session and pass to template
            })
        }else{
            console.log('calling home');
            console.log('ENV = ' + app.get('env'));
            var msg = req.flash('message') ; //.length>0?req.flash('message'):"test message";
            console.log(msg);
            res.render('index_.jade', { mesg: msg});
        }

    });

    //========================================
    //LOGIN PAGE =============================
    //========================================
    //render the login page and pass any flash data if it exists
    //app.get('/login',function(req,res){
    //    var msg = req.flash('loginMessage');
    //    console.log('calling login page - '+ msg);
    //    res.render('index_.jade', { message: msg});
    //});


    //process the signup form using custom callback with passport
    app.post('/login',function(req,res,next){
        console.log('calling passport authenticate');
        passport.authenticate('local-login',function(err,user,info){
            //console.log("err : " + err);
            //console.log("user : " + user);
            //console.log("info : " + info);
            //console.log('inside custom callback');
            if (err) {
                console.log("Error: " + err);
                return next(err);
            }
            if (!user) {
                console.log(info);
                return res.send(info.message);
            }
            req.logIn(user, function(err) {
                //console.log(user);
                if (err) { return next(err); }
                res.send({redirect:'/'});
            });
        })(req, res, next);
    });


    //app.get('/login_',function(req,res){
    //    var msg = req.flash('loginMessage');
    //    console.log('calling login_ page - '+ msg);
    //    res.render('index_.jade', { message: msg});
    //});
    //========================================
    //FORGOT PASS=============================
    //========================================
    //render the forgot password page
    //app.get('/forgot',function(req,res){
    //    console.log('calling forgot page');
    //    var msg= req.flash('info');
    //    res.render('forgot.jade',{message:msg});
    //});

    ////process forgot passowrd
    app.post('/forgot',function(req, res, next){
        console.log('calling /forgot with email :' + req.body.email);
        async.waterfall([
            function(done){
                console.log('generating token');
                crypto.randomBytes(20,function(err,buf){
                    var token = buf.toString('hex');
                    done(err,token)
                })
            },
            function(token,done){
                User.findOne({'local.email':req.body.email},function(err,user){
                    if(!user){
                        console.log('user not found');
                        //req.flash('info','No account with that email address exists');
                        return res.send({message:"No account with that email address exists"});
                    }
                    user.local.resetPasswordToken = token;
                    user.local.resetPasswordExpires = Date.now() + 3600000;
                    console.log('user',user);
                    user.save(function(err){
                        console.log('calling save');
                        done(err,token,user);
                    })
                })
            },
            function(token,user,done){
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'yahoo',
                    auth: {
                        user: 'RMLBPOC@yahoo.com',
                        pass: 'AusNZ0215'
                    }
                });
                //console.log(user);
                var mailOptions = {
                    to: user.local.email,
                    from: 'Fun Project Team <RMLBPOC@yahoo.com>',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    //req.flash('info', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
                    res.send({message:user.local.email});
                    //done(err, 'done');
                });
            }
        ],function(err) {
            if (err) return next(err);
            res.redirect('/');
        })
    });

    //========================================
    //RESET PASSWORD PAGE ====================
    //========================================
    app.get('/reset/:token',function(req,res,next){
        console.log('calling reset with token ', req.params.token);
        User.findOne({'local.resetPasswordToken':req.params.token,'local.resetPasswordExpires':{$gt:Date.now()}},function(err,user){
            if(!user){

                req.flash('info', 'Password reset token is invalid or has expired.');
                res.redirect('/forgot')
            }
            res.render('reset.jade');
        })
    });
    app.post('/reset/:token',function(req,res,next){
        async.waterfall([
            function(done){
                User.findOne({'local.resetPasswordToken':req.params.token,'local.resetPasswordExpires':{$gt:Date.now()}},function(err,user){
                    if(!user){

                        req.flash('info', 'Password reset token is invalid or has expired.');
                        res.redirect('back')
                    }
                    user.local.password = user.generateHash(req.body.password);
                    user.local.resetPasswordExpires =null;
                    user.local.resetPasswordToken = null;

                    user.save(function(err) {
                        req.logIn(user, function(err) {
                            done(err, user);
                        });
                    });
                })
            },
            function(user,done){
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'yahoo',
                    auth: {
                        user: 'RMLBPOC@yahoo.com',
                        pass: 'AusNZ0215'
                    }
                });
                var mailOptions = {
                    to: user.local.email,
                    from: 'Fun Project Team <RMLBPOC@yahoo.com>',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    //req.flash('info', 'Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function(err){
            res.redirect('/')
        })
    });
    //========================================
    //SIGNUP PAGE ============================
    //========================================
    //render signup page and pass any signup flash data if it exists
    //app.get('/signup',function(req,res){
    //    var msg = req.flash('signupMessage');
    //    console.log(msg);
    //    res.render('signup_old.jade',{message:msg});
    //});

    //process the signup form using custom callback with passport
    app.post('/signup',function(req,res,next){
        console.log('calling passport authenticate');
        passport.authenticate('local-signup',function(err,user,info){
            //console.log("err : " + err);
            //console.log("user : " + user);
            //console.log("info : " + info);
            //console.log('inside custom callback');
            if (err) {
                console.log("Error: " + err);
                return next(err);
            }
            if (!user) {
                console.log(info);
                return res.send(info.message);
            }
            req.logIn(user, function(err) {
                //console.log(user);
                if (err) { return next(err); }
                res.send({redirect:'/profile'});
            });
        })(req, res, next);
    });

    //app.post('/signup', passport.authenticate('local-signup', {
    //    successRedirect : '/profile', // redirect to the secure profile section
    //    failureRedirect : '/', // redirect back to the signup page if there is an error
    //    failureFlash : true // allow flash messages
    //}));



    //========================================
    //PROFILE PAGE ===========================
    //========================================
    //this will have to be protected so we need to be logged in
    //use route middleware to verify
    app.get('/profile',isLoggedIn,function(req,res){
        console.log('rendering profile');
        res.render('profile.jade',{
            user:req.user // get the user out of session and pass to template
        })
    });


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));



    //========================================
    //LOGOUT =================================
    //========================================
    app.get('/logout',function(req,res){
        //console.log('calling logout');
        req.logout();
        res.redirect('/');
    });

    //route middleware to check if user is logged in
    function isLoggedIn(req,res,next){
        console.log('checking auth');
        // if user is authenticated in the session, carry on
        if(req.isAuthenticated()){
            console.log('auth success');
            next();
        }else{
            console.log('not authorized');
            res.redirect('/');
        }
    }
};

//module.exports = router;
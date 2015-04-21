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

    app.get('/partials/vis/:filename', function(req,res){
      var filename = req.params.filename;
      if(!filename) return;  // might want to change this
      res.render("partials/vis/" + filename );
    });
    app.get('/partials/subs/:filename', function(req,res){
        var filename = req.params.filename;
        if(!filename) return;  // might want to change this
        res.render("partials/subs/" + filename );
    });
    app.get('/partials/subs/:dir/:filename', function(req,res){
      var filename = req.params.filename;
      var dir = req.params.dir;
      if(!filename) return;  // might want to change this
      res.render("partials/subs/" + dir + '/' + filename );
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
            console.log("err : " + err);
            console.log("user : " + user);
            console.log("info : " + info);
            console.log('inside custom callback');
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
                console.log('userid = ',res.cookies);
                res.send({redirect:'/',auth:true,user:user});
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
                    'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    //req.flash('info', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
                    res.send({message:user.local.email,token:token});
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
                console.log('user not found');
                //req.flash('info', 'Password reset token is invalid or has expired.');
                res.send({valid:false,message:'Password reset token is invalid or has expired.'})
            }else{
                res.send({valid:true});
            }
        })
    });
    app.post('/reset',function(req,res,next){
        var password = req.body.password;
        var token = req.body.token;
        console.log(token);
        console.log(password);
        async.waterfall([
            function(done){
                User.findOne({'local.resetPasswordToken':token,'local.resetPasswordExpires':{$gt:Date.now()}},function(err,user){
                    if(!user){
                        console.log('no user found');
                        //req.flash('info', 'Password reset token is invalid or has expired.');
                        res.send({valid:false,message:'Password reset token is invalid or has expired.'})
                    }
                    //console.log('user before updated password : ', user);
                    user.local.password = user.generateHash(password);
                    user.local.resetPasswordExpires =null;
                    user.local.resetPasswordToken = null;
                    //console.log('user after updated password : ', user);
                    user.save(function(err) {
                        console.log('user saved');

                        //req.logIn(user, function(err) {
                            done(err, user);
                        //});
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
                    console.log('sending email - ',user);
                    res.send({updated:true,user:user});
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
                res.send({redirect:'/',user:user});
            });
        })(req, res, next);
    });

    //delete user
    app.delete('/user/:id',function(req,res){
        console.log('delete by id');
        User.findByIdAndRemove(new Object(req.params.id), function(err, user) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: "User: " + req.params.id + " deleted successfully"
                })
            }
        })
    });

    //delete user
    app.delete('/userByEmail/:email',function(req,res){
        console.log('delete by email');
        User.findOne({'local.email':req.params.email}, function(err, user) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                if (!user) {
                    console.log('user not found');
                    res.send({message:'user not found'});
                }else{
                    user.remove(function(){
                        res.json({
                            type: true,
                            data: "User: " + req.params.email + " deleted successfully"
                        })
                    })
                }


            }
        })
    });

    //========================================
    //PROFILE PAGE ===========================
    //========================================
    //this will have to be protected so we need to be logged in
    //use route middleware to verify
    app.get('/profile',isLoggedIn,function(req,res){
        console.log('rendering profile');
        var userId = req.session.passport.user;
        User.findOne({"_id":userId},function(err,usr) {
          if (!usr) {
            console.log('no user found');
            res.send({message: 'No user found'});
          }
          res.send({user: usr});
        })
    });

    //make profile updates
    app.post('/profile',isLoggedIn,function(req,res){
        var profileObj = req.body;
        console.log(profileObj);
        var userId = req.session.passport.user;
        User.findOne({"_id":userId},function(err,usr){
            if(!usr){
                console.log('no user found');
                res.send({message:'No user found'});
            }

            usr.profile.dateOfBirth = profileObj.dateOfBirth;
            usr.profile.gender = profileObj.gender;
            usr.profile.heightFt = profileObj.heightFt;
            usr.profile.heightIn = profileObj.heightIn;
            usr.profile.mobileNumber = profileObj.mobileNumber;
            //console.log('user after updated profile : ', usr);
            usr.save(function(err) {
                res.send({user:usr,updated:true});
                //req.logIn(user, function(err) {
                //    done(err, user);
                //});
            });
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
            successRedirect : '/',
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
            successRedirect : '/',
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
            successRedirect : '/',
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
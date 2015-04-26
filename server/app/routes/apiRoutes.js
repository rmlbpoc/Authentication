var User = require('../../app/models/user.js');

module.exports = function(app,passport){

  //========================================
  // GET/POST/PUT PROFILE ===========================
  //========================================
  //this will have to be protected so we need to be logged in
  //use route middleware to verify
  app.get('/profile',isLoggedIn,function(req,res){
    //console.log('rendering profile');
    var userId = req.session.passport.user;
    User.findOne({"_id":userId},function(err,usr) {
      if (!usr) {
        console.log('no user found');
        res.send({message: 'No user found'});
      }
      //console.log(usr);
      res.send({user: usr});
    })
  });

  //make profile updates
  app.post('/profile',isLoggedIn,function(req,res){
    var profileObj = req.body;
    //console.log(profileObj);
    var userId = req.session.passport.user;
    console.log(userId);
    User.findOne({"_id":userId},function(err,usr){
      if(!usr){
        //console.log('no user found');
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

};
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

//module.exports = router;
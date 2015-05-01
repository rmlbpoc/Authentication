var FoodEntry  = require("../../app/models/foodEntry.js");

module.exports = function(app,passport){
  app.post('/foodEntry',isLoggedIn,function(req,res){

    var userId = req.session.passport.user;
    var foodEntry = req.body;
    foodEntry.entryUserId = userId;
    FoodEntry(foodEntry).save(function(err,entry){
      if(err){
        console.log('*****  ',err);
        throw err;
      }
      res.send({"foodEntry":entry})
    });
    //res.send({msg:'ok'});
  });

  app.get('/foodEntry/:id',isLoggedIn,function(req,res){
    FoodEntry.findOne({"_id":req.params.id})
      .populate("_foodId")
      .exec(function(err,entry){
        if(err){
          console.log("******  ",err);
          throw err;
        }
        res.send({entry:entry})
      })
  })
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

var Food = require('../../app/models/food.js');

module.exports = function(app) {
  app.post('/food', createFood);
  app.get('/food/:id',getFoodById);

  function createFood(req, res) {
    var food = new Food(req.body);

    food.save(function(err){
      if(err){
        console.log("****   Error saving food *** : " + err)
      }else{
        res.send({newFood:food});
      }

    });
  }

  function getFoodById(req,res){
    console.log(req.params['id']);
    Food.findById(req.params['id'],function(err,food){
      if(err){
        console.log("****   Error getting food *** : " + err)
      }else{
        console.log("****   food *** : " + food);
        res.send({food:food});
      }
    })
  }


};

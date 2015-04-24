var Food = require('../../app/models/food.js');

module.exports = function(app) {
  app.post('/food', createUpdateFood);
  app.get('/food/:id',getFoodById);

  function createUpdateFood(req, res) {
    var food = req.body;
    //console.log(food);
    if(food._id){
      console.log('food has id : ', food);
      Food.findOne(food._id,function(err,f){
        if(err){
          throw err;
        }

        //console.log('******* f before : ',f);
        f = food;
        //console.log('******* f after ', f);

        Food(f).update({upsert:true},function(err,fd){
          if(err){
            throw err;
          }

        });
        res.send({food:f});
      })
    }else{
      var newFood = new Food(food);
      console.log('Creating new food : ', newFood);
      newFood.save(function(err){
        if(err){
          console.log("****   Error saving food *** : " + err)
        }else{
          res.send({food:newFood});
        }

      });
    }

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

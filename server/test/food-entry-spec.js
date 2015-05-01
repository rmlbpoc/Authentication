var mongoose = require('mongoose');
var User = require('../app/models/user.js');
var Food = require('../app/models/food.js');
var meas = require('../app/models/measure.js');
var cat = require('../app/models/category.js');
var Measure = mongoose.model('Measure',meas.MeasureSchema);
var Category = mongoose.model('Category',cat.CategorySchema);

var FoodEntry = require('../app/models/foodEntry.js');

var should = require('should');
var request = require('supertest');
var server = require('../app.js');
var agent = request.agent(server);


describe('create update delete food entry', function(){

  var dt = new Date();
  dt.setHours(0);
  dt.setMinutes(0);
  dt.setSeconds(0);
  dt.setMilliseconds(0);

  //Create new user
  //Create new food
  //login user
  //Create food entry
  //return food entry - make sure food details are also returned
  //Update food entry
  //delete food entry

  var newUser = {firstName:'fname',lastName:'lname',email:"myemail007@myemail.com",password:"test1234"};

  var measures = [{measureId: 1, measureName: 'test measure2'}, {measureId: 2, measureName: 'test measure2'}];
  var categories = [{categoryId: 1, categoryType: 'CatType 1', categoryName: 'category 1'}, {categoryId: 2, categoryType: 'CatType 2', categoryName: 'category 2'}];
  var food = {foodId:1,foodName:"test Food",foodType:"food",foodCategories:categories,foodMeasures:measures};

  var newUserId;
  var newFoodId;

  var foodEntry = {entryDate:dt, entryUserId:'',entryTimeOfDay:'morning',entryAmount:2};

  function loginUser(user) {
    return function(done) {
      agent
        .post('/login')
        .send(user)
        .expect(200)
        //.expect('Location', '/')
        .end(onResponse);

      function onResponse(err, res) {
        //profileObj._Id = res.body.user._id;
        //console.log('After login',newUserId);
        if (err) return done(err);
        return done();
      }
    };
  }

  describe('Create new user',function(){
    it('should create a new user',function(done){
      var endpoint = '/signup';
      agent
        .post(endpoint)
        .send(newUser)
        .expect(200) //Status code
        .end(function(err,res){
          if(err){
            throw err;
          }
          console.log(res.body);
          newUserId=res.body.user._id;
          newUser._id = newUserId;
          //res.should.have.status(200);
          done();
        })
    });

    it('should login this user',function(done){
      agent
        .post('/login')
        .send(newUser)
        .expect(200)
        .end(function(err,res){
          //console.log(res.body);
          res.body.should.have.property('auth');
          res.body.auth.should.equal(true);
          done();
        })

    });

    it('should create a new food', function (done) {
      var endpoint = '/food';
      agent
        .post(endpoint)
        .send(food)
        .expect(200)
        .end(function (err, resp) {
          if (err) {
            console.log(err);
            throw err;
          }

          resp.body.should.have.property('food');
          resp.body.food.should.have.property('_id');
          resp.body.food.should.have.property('foodMeasures');
          resp.body.food.foodMeasures.length.should.equal(2);
          newFoodId = resp.body.food._id;
          food = resp.body.food;
          done();
        })
    });

    it('should create a new food entry',function(done) {
      foodEntry._foodId = newFoodId;
      agent
        .post('/foodEntry')
        .send(foodEntry)
        .expect(200)
        .end(function (err, resp) {
          if (err) {
            console.log(err);
            throw err;
          }
          //console.log(resp.body);
          foodEntry = resp.body.foodEntry;
          resp.body.foodEntry.entryUserId.should.equal(newUserId);
          resp.body.foodEntry._foodId.should.equal(newFoodId);
          done();
        });
    });

    it('should get the new food entry with food details',function(done){
      agent
        .get('/foodEntry/'+ foodEntry._id)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw err;
          }
          console.log(resp.body);
          done()
        })
    });

    it('should update food entry',function(done){
      foodEntry.entryAmount= 4;
      foodEntry.entryTimeOfDay='afternoon';
      agent
        .put('/foodEntry/' + foodEntry._id)
        .send(foodEntry)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw err;
          }
          resp.body.foodEntry.entryTimeOfDay.should.equal('afternoon');
          resp.body.foodEntry.entryAmount.should.equal(4);

        })
    });

    it('should delete user',function(done){
      console.log(newUser);
      agent
        .delete('/user/' + newUser._id)
        .expect(200)
        .end(function(err,res){
          if(err){
            throw err;
          }
          //console.log(res.body);
          done();
        })
    });

  })
});
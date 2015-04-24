var mongoose = require('mongoose');
var Food = require('../app/models/food.js');

var meas = require('../app/models/measure.js');
var Measure = mongoose.model('Measure',meas.MeasureSchema);

var should = require('should');
var request = require('supertest');
var server = require('../app.js');
var agent = request.agent(server);

describe('create update get and delete food', function(){
  //var measure = new Measure({measureId: 1, measureName: 'test measure2'});
  var measures = [{measureId: 1, measureName: 'test measure2'}, {measureId: 2, measureName: 'test measure2'}];

  var food = {foodId:1,foodName:"test Food",foodType:"food",foodCategory:"gluten free",foodMeasures:measures};
  var newFoodId;
  describe('create new food', function(){
    it('should create a new food',function(done){
      var endpoint = '/food';
      agent
        .post(endpoint)
        .send(food)
        .expect(200)
        .end(function(err,resp){
          if(err){
            console.log(err);
            throw err;
          }

          resp.body.should.have.property('food');
          resp.body.food.should.have.property('_id');
          resp.body.food.should.have.property('foodMeasures');
          resp.body.food.foodMeasures.length.should.equal(2);
          newFoodId = resp.body.food._id;
          food=resp.body.food;
          done();
        })
    });

    it('should retrieve food by id', function(done){
      var endpoint = '/food/'+ newFoodId;
      agent
        .get(endpoint)
        .expect(200)
        .end(function(err,resp){
          if(err){
            console.log(err);
            throw err;

          }
          resp.body.should.have.property('food');
          resp.body.food._id.should.equal(newFoodId);
          done();
        })
    });

    it('should update a food - add a new measure', function(done){
      var measure = new Measure({measureId:3,measureName:'test measure3'});
      food.foodMeasures.push(measure);
      console.log(food);

      agent
        .post('/food')
        .send(food)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw(err);
          }
          resp.body.should.have.property('food');
          resp.body.food._id.should.equal(newFoodId);
          resp.body.food.foodMeasures.length.should.equal(3);
          done();
        })
    });

    it('should update a food - remove a measure', function(done){

      food.foodMeasures.pop();
      console.log(food);

      agent
        .post('/food')
        .send(food)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw(err);
          }
          resp.body.should.have.property('food');
          resp.body.food._id.should.equal(newFoodId);
          resp.body.food.foodMeasures.length.should.equal(2);
          done();
        })
    });

    it('should update the name of the food',function(done){
      //var measure = new Measure({measureId:3,measureName:'test measure3'});
      var newName = 'Updated food name';
      food.foodName = newName;
      console.log(food);

      agent
        .post('/food')
        .send(food)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw(err);
          }
          resp.body.should.have.property('food');
          resp.body.food._id.should.equal(newFoodId);
          resp.body.food.foodName.should.equal(newName);
          done();
        })
    });
  })
});
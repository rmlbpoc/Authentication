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

          resp.body.should.have.property('newFood');
          resp.body.newFood.should.have.property('_id');
          newFoodId = resp.body.newFood._id;
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
    })
  })
});
var mongoose = require('mongoose');
var User = require('../app/models/user.js');
var Feeling = require('../app/models/feelingEntry.js');

var should = require('should');
var request = require('supertest');
var server = require('../app.js');
var agent = request.agent(server);

describe('create update delete feeling', function(){

  var newUser = {firstName:'fname',lastName:'lname',email:"myemail007@myemail.com",password:"test1234"};
  var newFeeling = {userId:'', feelingDate:new Date(),feelingTimeOfDay:'morning',feelingValue:'great'};
  var badFeeling = {userId:'', feelingDate:new Date(),feelingTimeOfDay:'morning',feelingValue:'not great'};
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

  describe('Signup New User',function(){
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
          //console.log('*********   response after signup ****** ',res.body);
          newUser=res.body.user;
          //res.should.have.status(200);
          done();
        })
    });

    //Now login that user
    it('should login user', loginUser(newUser));

    //Now enter feelings for the user
    it('should enter a value for feeling',function(done){
      newFeeling.userId = newUser._id;
      agent
        .post('/feeling')
        .send(newFeeling)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw err;
          }
          resp.body.should.have.property('feeling');
          resp.body.feeling.feelingValue.should.equal('great');
          newFeeling = resp.body.feeling;
          //console.log(newFeeling);
          done();
        })
    });

    //Now enter feelings for the user
    it('should update a value for feeling',function(done){
      newFeeling.feelingValue = 'tired';
      agent
        .post('/feeling')
        .send(newFeeling)
        .expect(200)
        .end(function(err,resp){
          if(err){
            throw err;
          }
          resp.body.should.have.property('feeling');
          resp.body.feeling.feelingValue.should.equal('tired');
          done();
        })
    });

    //Now enter invalid value for feelings for the user
    it('should not allow entering an invalid value for feeling',function(done){
      newFeeling.feelingValue = 'tired';
      agent
        .post('/feeling')
        .send(badFeeling)
        .expect(500)
        .end(function(err,resp){
          if(err){
            throw err;
          }
          resp.body.should.have.property('error');
          //resp.body.feeling.feelingValue.should.equal('tired');
          done();
        })
    });

    it('should delete user',function(done){
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
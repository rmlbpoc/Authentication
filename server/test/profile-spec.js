var User = require('../app/models/user.js');
//var login = require('../test/loginHelper.js');

var should = require('should');

var request = require('supertest');
var server = require('../app.js');
var agent = request.agent(server);
var newUserId;

var mongoose = require('mongoose');

describe('Profile routes',function(){

    var dob = new Date('12/03/1983');
    var newUser = {firstName:'fname',lastName:'lname',email:"profile@myemail.com",password:"test1234"};
    var profile = {dateOfBirth: dob, gender: 'M',heightFt: '5',heightIn: '7', mobileNumber : "1211211212"};
    newUser.profile = profile;
    var dbUser;
    var newPassword = "Test4321";

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
    //make sure that the test user is deleted incase it didnt get removed from previous run
    before(function(done){
        agent
            .delete('/userByEmail/' + newUser.email)
            .send()
            .expect(200)
            .end(function(err,res){
                console.log(res.body);
                done();
            })
    });
    describe('Get and set profiles',function() {
        //First create a new user
        it('should create a new user', function (done) {
            var endpoint = '/signup';
            agent
                .post(endpoint)
                .send(newUser)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    //console.log(res.body.user);
                    dbUser = res.body.user;
                    //res.should.have.status(200);
                    done();
                })
        });

        //Now login that user
        it('should login user', loginUser(newUser));

        it('should update user profile', function (done) {
            //console.log(newUser.profile);
            agent
                .post('/profile')
                .send(profile)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    //console.log('after update - inside test',res.body);
                    res.body.should.have.property('user');
                    done();
                })


        });

        it('should get user information',function(done){
            agent
                .get('/profile')
                .end(function (err, res) {
                    //console.log(res.body.user);
                    res.body.should.have.property('user');
                    var usrProfile = res.body.user.profile;
                    console.log('getting user profile ',usrProfile);

                    usrProfile.gender.should.equal(profile.gender);
                    usrProfile.dateOfBirth.should.equal(profile.dateOfBirth.toISOString());
                    usrProfile.heightFt.should.equal(profile.heightFt);
                    usrProfile.heightIn.should.equal(profile.heightIn);
                    usrProfile.mobileNumber.should.equal(profile.mobileNumber);
                    done();
                })
        });


        it('should delete user',function(done){
            agent
                .delete('/user/' + dbUser._id)
                .send({email:newUser.email,password:newPassword})
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body);
                    done();
                })
        })
    });
});


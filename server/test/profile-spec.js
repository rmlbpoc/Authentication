var User = require('../app/models/user.js');
//var login = require('../test/loginHelper.js');

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var server = request.agent('http://localhost:3000/');
var mongoose = require('mongoose');

describe('Profile routes',function(){

    var url="http://localhost:3000/";
    var dob = new Date('12/03/1983');
    var newUser = {firstName:'fname',lastName:'lname',email:"profile1@myemail.com",password:"test1234"};
    var profile = {dateOfBirth: dob, gender: 'M',height: '69', mobileNumber : "1211211212"};
    newUser.profile = profile;
    var dbUser;
    var newPassword = "Test4321";

    describe('Get and set profiles',function() {
        //First create a new user
        it('should create a new user', function (done) {
            var endpoint = 'signup';
            request(url)
                .post(endpoint)
                .send(newUser)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res.body.user);
                    dbUser = res.body.user;
                    //res.should.have.status(200);
                    done();
                })
        });

        //Now login that user
        it('should login user', loginUser(newUser));

        it('should update user profile', function (done) {
            console.log(newUser.profile);
            server
                .post('profile')
                .send(newUser)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res.body);
                           //res.body.should.have.property('user');
                            //res.should.have.status(200);
                    done();
                })


        });

        it('should get user information',function(done){
            server
                .get('profile')
                .end(function (err, res) {
                    //console.log(res.body.user);
                    res.body.should.have.property('user');
                    var usrProfile = res.body.user.profile;
                    console.log(usrProfile);

                    usrProfile.gender.should.equal(profile.gender);
                    usrProfile.dateOfBirth.should.equal(profile.dateOfBirth.toISOString());
                    usrProfile.height.should.equal(profile.height);
                    usrProfile.mobileNumber.should.equal(profile.mobileNumber);
                    done();
                })
        });


        it('should delete user',function(done){
            server
                .delete('user/' + dbUser._id)
                .send({email:newUser.email,password:newPassword})
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body);
                    done();
                })
        })
    });
});

function loginUser(user) {
    return function(done) {
        server
            .post('login')
            .send(user)
            .expect(200)
            //.expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
};
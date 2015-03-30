var User = require('../app/models/user.js');
//var login = require('../test/loginHelper.js');


var superagent = require('superagent');
var agent = superagent.agent();

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

describe('Profile routes',function(){

    var url="http://localhost:3000/";
    var newUser = {firstName:'fname',lastName:'lname',email:"profile1@myemail.com",password:"test1234"};
    var profile = {dateOfBirth  : "12/11/1983", gender: 'M',height: 69, mobileNumber : "1211211212"};
    newUser.profile = profile;
    var dbUser;
    var newPassword = "Test4321";

    describe('Get and set profiles',function() {
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



        it('should update user profile', function (done) {
            agent
                .post(url+'login')
                .send(newUser)
                .end(function (err, res) {
                    console.log(res.body);
                    agent
                        .post(url+'profile')
                        .send(newUser)
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
        });

        it('should get user information',function(done){
            agent
                .post(url+'login')
                .send(newUser)
                .end(function (err, res) {
                    console.log(res.body);
                    agent
                        .get(url+'profile')
                        .end(function (err, res) {
                            console.log(res.body.user);
                            res.body.should.have.property('user');
                            done();
                        })
                })
        });

        it('should delete user',function(done){
            request(url)
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
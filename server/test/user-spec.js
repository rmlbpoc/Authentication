var User = require('../app/models/user.js');

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

describe.skip('Signup and Login routes',function(){
    var url="http://localhost:3000/";
    var newUser = {firstName:'fname',lastName:'lname',email:"myemail001@myemail.com",password:"test1234"};
    var badUser = {email:"mye@myemail.com",password:"test1"};
    var dbUser;
    var resetToken;
    var badResetToken;
    var newPassword = "Test4321";
    describe('Signup New User',function(){
        it('should create a new user',function(done){
            var endpoint = 'signup';
            request(url)
                .post(endpoint)
                .send(newUser)
                .expect(200) //Status code
                .end(function(err,res){
                    if(err){
                        throw err;
                    }
                    console.log(res.body);
                    dbUser=res.body.user;
                    //res.should.have.status(200);
                    done();
                })
        });

        it('should login this user',function(done){
            request(url)
                .post('login')
                .send(newUser)
                .expect(200)
                .end(function(err,res){
                    console.log(res.body);
                    res.body.should.have.property('auth');
                    res.body.auth.should.equal(true);
                    done();
                })

        });

        it('should fail login for bad user',function(done){
            request(url)
                .post('login')
                .send(badUser)
                .expect(200)
                .end(function(err,res){
                    //console.log(res);
                    res.body.should.not.have.property('auth');
                    //res.body.auth.should.equal(true);
                    done();
                })
        });

        it('should create a reset token for forgot password request',function(done){
            request(url)
                .post('forgot')
                .send(newUser)
                .expect(200)
                .end(function(err,res){
                    console.log(res.body.token);
                    res.body.should.have.property('token');
                    resetToken = res.body.token;
                    //res.body.auth.should.equal(true);
                    done();
                })
        });

        it('should validate reset token',function(done){
            request(url)
                .get('reset/' + resetToken)
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body.token);
                    res.body.should.have.property('valid');
                    res.body.valid.should.equal(true);
                    done();
                })
        });

        it('should invalidate bad reset token',function(done){
            request(url)
                .get('reset/' + badResetToken )
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body.token);
                    res.body.should.have.property('valid');
                    res.body.valid.should.equal(false);
                    done();
                })
        });

        it('should reset passowrd with valid token',function(done){
            console.log(resetToken);
            request(url)
                .post('reset')
                .send({password:newPassword,token:resetToken})
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body);
                    res.body.should.have.property('updated');
                    res.body.updated.should.equal(true);
                    res.body.should.have.property('user');
                    should.not.exist(res.body.user.local.resetPasswordToken);
                    should.not.exist(res.body.user.local.resetPasswordExpires);
                    done();
                })
        });

        it('should allow user to login with new pasword',function(done){
            request(url)
                .post('login')
                .send({email:newUser.email,password:newPassword})
                .expect(200)
                .end(function(err,res){
                    console.log(res.body);
                    res.body.should.have.property('auth');
                    res.body.auth.should.equal(true);
                    done();
                })
        });

        it('should delete user',function(done){
            request(url)
                .delete('user/' + dbUser._id)
                .send({email:newUser.email,password:newPassword})
                .expect(200)
                .end(function(err,res){
                    console.log(res.body);

                    done();
                })
        })
    })

});
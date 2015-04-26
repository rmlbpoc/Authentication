var User = require('../app/models/user.js');

var should = require('should');
var request = require('supertest');
var server = require('../app.js');
var agent = request.agent(server);
var mongoose = require('mongoose');

describe('Signup and Login routes',function(){
    //var url="http://localhost:3000/";
    var newUser = {firstName:'fname',lastName:'lname',email:"myemail007@myemail.com",password:"test1234"};
    var badUser = {email:"mye@myemail.com",password:"test1"};
    var dbUser;
    var resetToken;
    var badResetToken;
    var newPassword = "Test4321";

    //make sure that the test user is deleted in case it didnt get removed from previous run
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
                    //console.log(res.body);
                    dbUser=res.body.user;
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

        it('should fail login for bad user',function(done){
            agent
                .post('/login')
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
            agent
                .post('/forgot')
                .send(newUser)
                .expect(200)
                .end(function(err,res){
                  if(err){
                    throw err;
                  }
                //console.log(res.body.token);
                res.body.should.have.property('token');
                resetToken = res.body.token;
                //res.body.auth.should.equal(true);
                done();
                })
        });

        it('should validate reset token',function(done){
            agent
                .get('/reset/' + resetToken)
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body.token);
                    res.body.should.have.property('valid');
                    res.body.valid.should.equal(true);
                    done();
                })
        });

        it('should invalidate bad reset token',function(done){
            agent
                .get('/reset/' + badResetToken )
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body.token);
                    res.body.should.have.property('valid');
                    res.body.valid.should.equal(false);
                    done();
                })
        });

        it('should reset passowrd with valid token',function(done){
            //console.log(resetToken);
            agent
                .post('/reset')
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
            agent
                .post('/login')
                .send({email:newUser.email,password:newPassword})
                .expect(200)
                .end(function(err,res){
                    //console.log(res.body);
                    res.body.should.have.property('auth');
                    res.body.auth.should.equal(true);
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
    })

});
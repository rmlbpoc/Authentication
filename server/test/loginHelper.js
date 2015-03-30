var superagent = require('superagent');
var agent = superagent.agent();
var url="http://localhost:3000/";

exports.login = function (user,done) {
    agent
        .post(url+'login')
        .send(user)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            agent.saveCookies(res);
            done(agent);
        });
};
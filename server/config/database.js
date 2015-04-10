var env = process.env.NODE_ENV;
console.log('the node env is ' + env);
var urlLocal = "mongodb://localhost:27017/test";
var urlRemote = "mongodb://rmlbmongo:titanic0215@oceanic.mongohq.com:10006/wwpilotdb"
var url = env=='test'?urlLocal:urlRemote;
module.exports = {
    url: url
};
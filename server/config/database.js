var env = process.env.NODE_ENV;
console.log('the node env is ' + env);
var db = env=='test'?'wwtestdb':'wwpilotdb';
module.exports = {
    url:'mongodb://rmlbmongo:titanic0215@oceanic.mongohq.com:10006/' + db
};
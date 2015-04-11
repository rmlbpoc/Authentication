
module.exports = {
    db: "mongodb://rmlbmongo:titanic0215@oceanic.mongohq.com:10006/wwpilotdb",
    openIdAuth: {
      'facebookAuth': {
        'clientID': '762491043847196', // your App ID
        'clientSecret': '6883f89345f10a0e8187449a9fcf6cf0', // your App Secret
        'callbackURL': 'https://rmlbfunproject.herokuapp.com/auth/facebook/callback'
      },

      'twitterAuth': {
        'consumerKey': 'gjS6iEvpA9h5RoqgBqqFPyh5e',
        'consumerSecret': 'Y8sLzxsrmvpeqBj22A76OOBYFM8IDqGKD4XAR8FlD1RahSxkQE',
        'callbackURL': 'https://rmlbfunproject.herokuapp.com/auth/twitter/callback'
      },

      'googleAuth': {
        'clientID': '804893419219-q8sr2h35jtpl398teu1kg9m2ubg1mktt.apps.googleusercontent.com',
        'clientSecret': '9Q71Z7q8BBFsElTwgYVzV6cW',
        'callbackURL': 'https://rmlbfunproject.herokuapp.com/auth/google/callback'
      }
    }
};
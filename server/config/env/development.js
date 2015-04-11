
module.exports = {
    db: "mongodb://localhost:27017/development",
    openIdAuth : {
            'facebookAuth': {
              'clientID': '911617848888518', // your App ID
              'clientSecret': 'f170a7bc8d2e5fbd0779dc4932773e92', // your App Secret
              'callbackURL': 'http://localhost:3000/auth/facebook/callback'
            },
            'twitterAuth': {
              'consumerKey': 'ktgbyPp9mZg4q4liOT6pvZ6LL',
              'consumerSecret': 'c1qOQVcCJHs0QDweyviwOf7jzDETykyCdFBcrItbKd0L117ugW',
              'callbackURL': 'http://localhost:3000/auth/twitter/callback'
            },
            'googleAuth': {
              'clientID': '291365835393-k5ctu5a5rfo1roj6vkuukbeoogpbujrb.apps.googleusercontent.com',
              'clientSecret': 'HeZVef7X1lmb_LYW8J15rwJx',
              'callbackURL': 'http://127.0.0.1:3000/auth/google/callback'
            }
      }

};
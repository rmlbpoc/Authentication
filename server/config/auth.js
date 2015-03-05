// expose our config directly to our application using module.exports
//module.exports = {
//
//    'facebookAuth' : {
//        'clientID'      : '450960661719417', // your App ID
//        'clientSecret'  : '47f159ab1b40ca9af160a1797b4eeb9a', // your App Secret
//        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
//    },
//
//    'twitterAuth' : {
//        'consumerKey'       : '46H2Ku0cU6lZmBJNinJnnl0IL',
//        'consumerSecret'    : 'heNYEEP4p1W80pl1nRdzgJfz7Dm4j5hU7DWm7l6i5ZOn0lB634',
//        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
//    },
//
//    'googleAuth' : {
//        'clientID'      : '164112971586-1si12tlvjpr2lbahq0416af0190rrqa8.apps.googleusercontent.com',
//        'clientSecret'  : 'e6mY7SlNpBskHGO2dLmquceH',
//        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
//    }
//
//};


var openIdAuth = {
    production : {

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
    },
    development : {

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
module.exports = function(env){

    this.getFacebookAuth = function(){
        //console.log('getting auth config for '+env);
        return env=='development'?openIdAuth.development.facebookAuth:openIdAuth.production.facebookAuth;
    };

    this.getTwitterAuth = function(){
        return env=='development'?openIdAuth.development.twitterAuth:openIdAuth.production.twitterAuth;
    };

    this.getGoogleAuth = function(){
        return env=='development'?openIdAuth.development.googleAuth:openIdAuth.production.googleAuth;
    };
};
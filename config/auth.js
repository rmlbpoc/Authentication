// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '450960661719417', // your App ID
        'clientSecret'  : '47f159ab1b40ca9af160a1797b4eeb9a', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : '46H2Ku0cU6lZmBJNinJnnl0IL',
        'consumerSecret'    : 'heNYEEP4p1W80pl1nRdzgJfz7Dm4j5hU7DWm7l6i5ZOn0lB634',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '164112971586-1si12tlvjpr2lbahq0416af0190rrqa8.apps.googleusercontent.com',
        'clientSecret'  : 'e6mY7SlNpBskHGO2dLmquceH',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
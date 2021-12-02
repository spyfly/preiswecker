const signUp = require('./signUp');
const signIn = require('./signIn');
const priceAlert = require('./priceAlert');

module.exports = {
    paths:{
        '/auth/signup':{
            ...signUp
        },
        '/auth/signin':{
            ...signIn
        },
        '/user/pricealert':{
            ...priceAlert
        },
    }
}
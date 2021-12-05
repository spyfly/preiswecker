const signUp = require('./signUp');
const signIn = require('./signIn');
const priceAlerts = require('./priceAlerts');
const singlePriceAlert = require('./singlePriceAlert');

module.exports = {
    paths: {
        '/auth/signup': {
            ...signUp
        },
        '/auth/signin': {
            ...signIn
        },
        '/user/pricealert': {
            ...priceAlerts
        },

        '/user/pricealert/': {
            ...singlePriceAlert
        }
    }
}
const signUp = require('./signUp');
const signIn = require('./signIn');

module.exports = {
    paths:{
        '/auth/signup':{
            ...signUp
        },
        '/auth/signin':{
            ...signIn
        },
    }
}
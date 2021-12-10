import { createStore } from "vuex";

import auth from "./auth";
import user from "./user";

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const accessToken = localStorage.getItem('accessToken');

// set initial state
var state = accessToken
    ? { loggedIn: true, accessToken, user: parseJwt(accessToken) }
    : { loggedIn: false, accessToken}
    ;

export default createStore({
    state,
    mutations: {
        setAccessToken(state, access_token) {
            state.access_token = access_token;
        },
        loginSuccess(state) {
            state.loggedIn = true;
        },
        loginFailure(state) {
            state.loggedIn = false;
        }
    },
    actions: {
        async login({ commit }, { identifier, password }) {
            return auth.login(identifier, password).then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                console.log(response.data);
                commit('loginSuccess', accessToken);
                return true;
            }).catch(error => {
                console.log(error.response);
                const errors = error.response.data.errors;
                console.table(errors);
                commit('loginFailure', accessToken);
                return errors;
            });
        },
        async register({ commit }, { username, email, password }) {
            console.log(username, email, password);
            return auth.register(username, email, password).then(response => {
                return true;
            }).catch(error => {
                console.log(error.response);
                const errors = error.response.data.errors;
                console.table(errors);
                return errors;
            });
        },
        logout({ commit }) {
            localStorage.removeItem('accessToken');
            commit('loginFailure', accessToken);
        },
        async newAlert({ commit }, { name, filterUrl, targetPrice }) {
            console.log(name, filterUrl, targetPrice);
            return user.createNewAlert(name, filterUrl, targetPrice, state.accessToken).then(response => {
                return true;
            }).catch(error => {
                console.log(error.response);
                const errors = error.response.data.errors;
                console.table(errors);
                return errors;
            });
        },
    },
});
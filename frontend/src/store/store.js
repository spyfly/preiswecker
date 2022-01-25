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
export var state = accessToken
    ? {
        loggedIn: true,
        user: parseJwt(accessToken)
    }
    : {
        loggedIn: false
    }
    ;

state.accessToken = accessToken;
state.alerts = [];

export default createStore({
    state,
    mutations: {
        setAccessToken(state, access_token) {
            state.access_token = access_token;
        },
        loginSuccess(state, accessToken) {
            state.loggedIn = true;
            state.accessToken = accessToken;
        },
        loginFailure(state) {
            state.loggedIn = false;
        },
        setAlerts(state, alerts) {
            state.alerts = alerts;
        }
    },
    actions: {
        async login({ commit }, { identifier, password }) {
            return auth.login(identifier, password).then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                commit('loginSuccess', response.data.accessToken);
                return true;
            }).catch(error => {
                const errors = error.response.data.errors;
                commit('loginFailure');
                return errors;
            });
        },
        async register({ commit }, { username, email, password }) {
            console.log(username, email, password);
            return auth.register(username, email, password).then(response => {
                return true;
            }).catch(error => {
                const errors = error.response.data.errors;
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
                const errors = error.response.data.errors;
                return errors;
            });
        },
        async fetchAllAlerts({ commit }) {
            return user.fetchAllAlerts(state.accessToken).then(response => {
                console.log(response.data);
                commit('setAlerts', response.data);
                return response.data;
            }).catch(error => {
                const errors = error.response.data.errors;
                return errors;
            });
        },
        async deleteAlert({ commit }, id ) {
            console.log(id);
            return user.deleteAlert(id, state.accessToken).then(response => {
                return true;
            }).catch(error => {
                const errors = error.response.data.errors;
                return errors;
            });
        },
        async editAlert({ commit }, { id, name, filterUrl, targetPrice }) {
            console.log(id, name, filterUrl, targetPrice);
            return user.editAlert(id, name, filterUrl, targetPrice, state.accessToken).then(response => {
                return true;
            }).catch(error => {
                const errors = error.response.data.errors;
                return errors;
            });
        },
    }
});
import axios from "axios";

const api_url = process.env.VUE_APP_API_URL;

async function login(identifier, password) {
    return axios.post(api_url+'/auth/signin', {
        identifier,
        password,
    });
}
async function register(username, email, password) {
    return axios.post(api_url+'/auth/signup', {
        username, email, password
    });
}

export default ({
    login,
    register
})



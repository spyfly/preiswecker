import axios from "axios";

async function login(identifier, password) {
    console.log(identifier, password);
    return axios.post('http://localhost:8080/api/auth/signin', {
        identifier,
        password,
    });
}
async function register(username, email, password) {
    console.log(username, email, password);
    return axios.post('http://localhost:8080/api/auth/signup', {
        username, email, password
    });
}

export default ({
    login,
    register
})



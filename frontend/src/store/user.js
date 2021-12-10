import axios from "axios";



async function createNewAlert(name, filterUrl, targetPrice, accessToken) {
    console.log(name, filterUrl, targetPrice, accessToken);
    return axios.post('http://localhost:8080/api/user/pricealert', {
        name,
        filterUrl,
        targetPrice
    },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
}

export default ({
    createNewAlert
})



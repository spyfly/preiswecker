import axios from "axios";

const api_url = process.env.VUE_APP_API_URL;


async function createNewAlert(name, filterUrl, targetPrice, accessToken) {
    console.log(name, filterUrl, targetPrice, accessToken);
    return axios.post(api_url+'/user/pricealert', {
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
async function fetchAllAlerts(accessToken) {
    return axios.get(api_url+'/user/pricealert',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            },
        }
    );
}
async function deleteAlert(id, accessToken) {
    console.log(id, accessToken);
    return axios.delete(api_url + '/user/pricealert/' + id, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
}
async function editAlert(id, name, filterUrl, targetPrice, accessToken) {
    console.log(id, name, filterUrl, targetPrice, accessToken);
    return axios.put(api_url+'/user/pricealert/'+ id, {
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
    createNewAlert,
    fetchAllAlerts,
    deleteAlert,
    editAlert
})



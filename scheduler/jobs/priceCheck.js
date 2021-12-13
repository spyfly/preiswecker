const axios = require('axios');
const querystring = require('querystring');

(async () => {
    axios.get('http://localhost:5000/pricealerts')
        .then(function (responseApi) {
            if(responseApi.data !== undefined && responseApi.data !== null){
                for(const user in response.data){
                    for(const priceAlert in user.priceAlerts){
                        axios.get('http://localhost:3000/fetch', querystring.stringify({ cat: '', xf: priceAlert.filterUrl }))
                        .then(function (responseCrawler) {
                            if(responseCrawler.data !== undefined && responseCrawler.data !== null){
                                if(responseCrawler.data.price <= priceAlert.targetPrice){
                                    axios.put(`http://localhost:5000/pricealerts/${priceAlert.id}`, {userID: user.userID, reachedPrice: responseCrawler.data.price })
                                    .then(function (responseApi2) {
                                        
                                    })
                                    .catch(function (error) {
                                        // handle error
                                        console.log(error);
                                    })
                                }
                            }
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                    }
                }
                
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})();
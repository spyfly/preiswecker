const axios = require('axios');

(async () => {
    axios.get('http://rest-api:5000/api/pricealerts', {
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        },
    })
        .then(function (responseApi) {
            if (responseApi.data !== undefined && responseApi.data !== null) {
                console.log(responseApi.data);
                for (const user of responseApi.data.priceAlertsFromUsers) {
                    for (const priceAlert of user.priceAlerts) {
                        axios.get('http://crawler:3000/fetch' + priceAlert.filterUrl.replace("https://geizhals.de", "").replace("https://geizhals.at", "").replace("https://geizhals.eu", ""))
                            .then(function (responseCrawler) {
                                if (responseCrawler.data !== undefined && responseCrawler.data !== null) {
                                    console.log(responseCrawler.data);
                                    let reached = false;
                                    let reachedPrice = 999999999999999;
                                    for (const offer of responseCrawler.data) {
                                        if (offer.price <= priceAlert.targetPrice) {
                                            reached = true;
                                            if (reachedPrice >= offer.price) {
                                                reachedPrice = offer.price;
                                            }
                                        }
                                    }
                                    axios.put(`http://rest-api:5000/api/pricealerts/${priceAlert._id}`, { userID: user.userID, reachedPrice: reachedPrice, reached: reached })
                                        .then(function (responseApi2) {
                                            if (responseApi2.status === 200) {
                                                console.log(`Price alert with ID ${priceAlert._id} by user with ID ${user.userID} with the following price: ${reachedPrice} and the status ${reached} updated!.`);
                                            } else {
                                                console.log(responseApi2.data);
                                            }
                                        })
                                        .catch(function (error) {
                                            // handle error
                                            console.log(error);
                                        })
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
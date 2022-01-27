const axios = require('axios');
const nodemailer = require("nodemailer");

(async () => {
    let emailTransporter = nodemailer.createTransport({
        host: "securemail.linevast.de",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "preiswecker@pushbox.es", // generated ethereal user
          pass: "rVFQgpbA6buzMhP9", // generated ethereal password
        },
      });

    axios.get('http://rest-api:5001/api/pricealerts', {
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        },
    })
        .then(function (responseApi) {
            if (responseApi.data && responseApi.data.priceAlertsFromUsers) {
                for (const user of responseApi.data.priceAlertsFromUsers) {
                    for (const priceAlert of user.priceAlerts) {
                        axios.get('http://crawler:3000/fetch' + priceAlert.filterUrl.replace("https://geizhals.de", "").replace("https://geizhals.at", "").replace("https://geizhals.eu", ""))
                            .then(function (responseCrawler) {
                                if (responseCrawler.data !== undefined && responseCrawler.data !== null) {
                                    let reached = false;
                                    let reachedPrice = 999999999999999;
                                    for (const offer of responseCrawler.data) {
                                        if (offer.price <= priceAlert.targetPrice) {
                                            reached = true;
                                        }
                                        if (reachedPrice >= offer.price) {
                                            reachedPrice = offer.price;
                                        }
                                    }
                                    if(reached && !priceAlert.reached){
                                        let emailMessage = `Alarm! Der von dir erstellte Preiswecker mit dem Namen ${priceAlert.name} hat den Zielpreis von ${priceAlert.targetPrice} erreicht. Aktuell ist der niedrigste Preis bei ${reachedPrice}.`;
                                        emailTransporter.sendMail({
                                            from: '"Preiswecker" <preiswecker@pushbox.es>', // sender address
                                            to: user.user.email, // list of receivers
                                            subject: `Preiswecker ${priceAlert.name} wurde erreicht!`, // Subject line
                                            text: emailMessage, // plain text body
                                            html: emailMessage, // html body
                                          });
                                    }
                                    axios.put(`http://rest-api:5001/api/pricealerts/${priceAlert._id}`, { userID: user.user.id, reachedPrice: reachedPrice, reached: reached })
                                        .then(function (responseApi2) {
                                            if (responseApi2.status === 200) {
                                                console.log(`Price alert with ID ${priceAlert._id} by user with ID ${user.user.id} with the following price: ${reachedPrice} and the status ${reached} updated!.`);
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

            } else {
                console.log("No price alerts found!")
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})();
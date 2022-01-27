module.exports = function () {
    let operations = {
        GET
    };

    async function GET(req, res, next) {
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

        const query = req.query;

        //Filter Query Params
        var filteredQuery = [];
        for (const [key, values] of Object.entries(query)) {
            console.log(key + ":" + values + " | " + typeof values);
            if (values.length > 0) {
                if (typeof values == 'object') {
                    for (const value of values) {
                        filteredQuery.push(key + "=" + value)
                    }
                } else {
                    filteredQuery.push(key + "=" + values)
                }
            }
        }

        const apiQueryString = '?' + filteredQuery.join('&');
        console.log(apiQueryString)
        const apiReq = await fetch("https://geizhals.de/api/gh0/categorylist/" + apiQueryString, {
            "credentials": "include",
            "headers": {
                "Accept": "application/json",
            },
            "referrer": "https://geizhals.de/?cat=gra16_512",
            "method": "GET",
            "mode": "cors"
        });
        const apiRes = await apiReq.json();
        if (apiRes.error) {
            console.log("Crawling Error occured: " + apiRes.error)
            res.status(500).json({
                error: apiRes.error
            });
        } else {
            const products = apiRes.response.products;
            console.log(products.length + " Products found!");

            /* Transform Geizhals API Response */
            var itemsArray = [];
            for (const product of products) {
                const best_offer = decodeURIComponent(product.best_deep_link.match(/&loc=[^&]*/)[0].replace("&loc=", "").replace(/%([^\d].)/, "%25$1"));
                itemsArray.push({
                    product: product.product,
                    best_offer: best_offer,
                    link: "https://geizhals.de/" + product.id,
                    price: product.best_price,
                    ppu: product.ppu
                });
            }
            res.status(200).json(itemsArray);
        }
    }

    GET.apiDoc = {
        summary: "Fetch geizhals.de API",
        operationId: "fetchByFilter",
        parameters: [
            {
                name: "cat",
                in: "query",
                type: "string",
                required: true,
                description: "Geizhals.de category"
            },
            {
                name: "xf",
                in: "query",
                type: "string",
                description: "Geizhals.de filter string"
            }
        ],
        responses: {
            200: {
                description: "List of Geizhals.de products",
                schema: {
                    type: "array",
                    items:
                    {
                        type: "object",
                        properties: {
                            product: {
                                type: "string",
                                description: "Product name"
                            },
                            best_offer: {
                                type: "string",
                                description: "Link to the storefront with the best offer",
                            },
                            link: {
                                type: "string",
                                description: "Link to the geizhals.de product page"
                            },
                            price: {
                                type: "number",
                                description: "Price of the best offer"
                            },
                            ppu: {
                                type: "number",
                                description: "Price per Unit"
                            }
                        },
                        required: [
                            "product", "best_offer", "link", "price"
                        ]
                    },
                },
            },
        },
    };

    return operations;
};
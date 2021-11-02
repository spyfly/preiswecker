module.exports = function () {
    let operations = {
        GET
    };

    async function GET(req, res, next) {
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

        var query = req.query;
        const apiQueryString = '?' + Object.keys(query).map(key => key + '=' + query[key]).join('&');
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
        const products = apiRes.response.products;

        /* Transform Geizhals API Response */
        var itemsArray = [];
        for (const product of products) {
            const best_offer = decodeURIComponent(product.best_deep_link.match(/&loc=[^&]*/)[0].replace("&loc=", ""));
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